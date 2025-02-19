package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"database/sql"

	"github.com/gorilla/mux"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

type Subscription struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	MonthlyCost  string `json:"monthlyCost"`
	BillingCycle string `json:"billingCycle"`
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

func getSubscription(w http.ResponseWriter, r *http.Request) {
	subscription := &Subscription{
		ID:           "1",
		Name:         "Basic",
		MonthlyCost:  "10",
		BillingCycle: "monthly",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscription)
}

func addSubscription(w http.ResponseWriter, r *http.Request) {
	// code to add a new subscription
}

func updateSubscription(w http.ResponseWriter, r *http.Request) {
	// code to update a subscription
}

func deleteSubscription(w http.ResponseWriter, r http.Request) {
	// code to delete a subscription
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
	subscriptionRoutes.HandleFunc("/", getSubscription).Methods("GET")

	http.ListenAndServe(":8080", router)
}
