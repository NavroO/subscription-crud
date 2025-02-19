package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"database/sql"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

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

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("Migration up error: %v", err)
	}
	log.Println("Migrations applied successfully!")
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
