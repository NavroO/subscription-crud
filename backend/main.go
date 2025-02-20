package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"database/sql"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/crypto/bcrypt"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

type Subscription struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	MonthlyCost  float64 `json:"monthlyCost"`
	BillingCycle string  `json:"billingCycle"`
}

type DashboardResponse struct {
	TotalSubscriptions int     `json:"total_subscriptions"`
	MonthlySpend       float64 `json:"monthly_spend"`
	PotentialSavings   float64 `json:"potential_savings"`
}

var db *sql.DB

var jwtSecret = []byte("your-secret-key")

func GenerateToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func ValidateToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	return token, err
}

func loginUser(username, password string) (string, error) {
	var storedHash string

	err := db.QueryRow("SELECT password_hash FROM users WHERE username = $1", username).Scan(&storedHash)
	if err == sql.ErrNoRows {
		return "", fmt.Errorf("user not found")
	} else if err != nil {
		return "", fmt.Errorf("database error: %v", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(password))
	if err != nil {
		return "", fmt.Errorf("invalid password")
	}

	// Generate JWT token
	token, err := GenerateToken(username)
	if err != nil {
		return "", fmt.Errorf("failed to generate token: %v", err)
	}

	return token, nil
}

func protectedEndpoint(tokenString string) {
	token, err := ValidateToken(tokenString)
	if err != nil || !token.Valid {
		fmt.Println("Access denied: invalid token")
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		fmt.Println("Access denied: invalid claims")
		return
	}

	fmt.Println("Access granted! Welcome,", claims["username"])
}

func registerUser(name, email, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %v", err)
	}

	_, err = db.Exec("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)", name, email, hash)
	if err != nil {
		return fmt.Errorf("failed to insert user: %v", err)
	}

	return nil
}

func connectToDatabase() (*sql.DB, error) {
	connStr := "user=tomeknawrocki dbname=subscription_crud sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}

func getDashboardInfo(w http.ResponseWriter, r *http.Request) {
	var dashboardResponse DashboardResponse

	err := db.QueryRow("SELECT COUNT(id), SUM(monthly_cost) FROM subscription").Scan(&dashboardResponse.TotalSubscriptions, &dashboardResponse.MonthlySpend)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	dashboardResponse.PotentialSavings = dashboardResponse.MonthlySpend * 0.1

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dashboardResponse)
}

func getSubscriptions(w http.ResponseWriter, r *http.Request) {
	var subscriptions []Subscription

	rows, err := db.Query("SELECT id, name, monthly_cost, billing_cycle FROM subscription")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var subscription Subscription
		if err := rows.Scan(&subscription.ID, &subscription.Name, &subscription.MonthlyCost, &subscription.BillingCycle); err != nil {
			http.Error(w, "Failed to scan subscription", http.StatusInternalServerError)
			return
		}
		subscriptions = append(subscriptions, subscription)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error during iteration", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscriptions)
}

func addSubscription(w http.ResponseWriter, r *http.Request) {
	var subscription Subscription
	err := json.NewDecoder(r.Body).Decode(&subscription)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = db.QueryRow("INSERT INTO subscription (name, monthly_cost, billing_cycle) VALUES ($1, $2, $3) RETURNING id",
		subscription.Name, subscription.MonthlyCost, subscription.BillingCycle).Scan(&subscription.ID)

	if err != nil {
		fmt.Println("Schodaw")
		fmt.Println(err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscription)
}

func updateSubscription(w http.ResponseWriter, r *http.Request) {
	var subscription Subscription
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	id := r.FormValue("id")
	name := r.FormValue("name")
	monthlyCost := r.FormValue("monthlyCost")
	billingCycle := r.FormValue("billingCycle")

	_, err = db.Exec("UPDATE subscription SET name = $1, monthly_cost = $2, billing_cycle = $3 WHERE id = $4",
		name, monthlyCost, billingCycle, id)

	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscription)
}

func deleteSubscription(w http.ResponseWriter, r *http.Request) {
	var subscription Subscription
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	id := r.FormValue("id")

	_, err = db.Exec("DELETE FROM subscription WHERE id = $1", id)

	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscription)
}

func runMigrations() {
	m, err := migrate.New(
		"file://db/migrations",
		"postgres://tomeknawrocki@localhost/subscription_crud?sslmode=disable",
	)
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	if err := m.Force(1); err != nil {
		log.Fatalf("Failed to force migration version: %v", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("Migration up error: %v", err)
	}
	log.Println("Migrations applied successfully!")
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var credentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	token, err := loginUser(credentials.Username, credentials.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var user struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = registerUser(user.Name, user.Email, user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func main() {
	var err error
	db, err = connectToDatabase()
	if err != nil {
		log.Fatalf("Database connection error: %v", err)
	}

	log.Println("Connected to database successfully!")

	runMigrations()

	router := mux.NewRouter()

	subscriptionRoutes := router.PathPrefix("/api/v1/subscriptions").Subrouter()
	subscriptionRoutes.HandleFunc("/", getSubscriptions).Methods("GET")
	subscriptionRoutes.HandleFunc("/", addSubscription).Methods("POST")
	subscriptionRoutes.HandleFunc("/", updateSubscription).Methods("PUT")
	subscriptionRoutes.HandleFunc("/", deleteSubscription).Methods("DELETE")
	subscriptionRoutes.HandleFunc("/getDashboardInfo", getDashboardInfo).Methods("GET")

	authRoutes := router.PathPrefix("/auth").Subrouter()
	authRoutes.HandleFunc("/login", loginHandler).Methods("POST")
	authRoutes.HandleFunc("/register", registerHandler).Methods("POST")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	})

	handler := corsHandler.Handler(router)

	log.Println("Starting server on port 8080...")

	err = http.ListenAndServe(":8080", handler)
	if err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
