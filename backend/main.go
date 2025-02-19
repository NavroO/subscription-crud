package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type Subscription struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	MonthlyCost  string `json:"monthlyCost"`
	BillingCycle string `json:"billingCycle"`
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

func main() {
	router := mux.NewRouter()

	subscriptionRoutes := router.PathPrefix("/api/v1/subscriptions").Subrouter()
	subscriptionRoutes.HandleFunc("/", getSubscription).Methods("GET")

	http.ListenAndServe(":8080", router)
}
