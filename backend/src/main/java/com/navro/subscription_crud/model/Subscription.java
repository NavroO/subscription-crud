package com.navro.subscription_crud.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="name", nullable=false)
    private Number monthlyCost;

    @Column(name="name", nullable=false)
    private String billingCycle;

    public Number getMonthlyCost() {
        return monthlyCost;
    }

    public void setMonthlyCost(Number monthlyCost) {
        this.monthlyCost = monthlyCost;
    }

    public String getBillingCycle() {
        return billingCycle;
    }

    public void setBillingCycle(String billingCycle) {
        this.billingCycle = billingCycle;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
