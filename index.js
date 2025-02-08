import express from "express";
import morgan from "morgan";
import {calculateAnnualCost, suggestCancellations} from "./calculation.js"

const app = express()
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());

/**
 * @typedef {Object} Subscription
 * @property {string} name - Name of the subscription
 * @property {number} monthlyCost - Monthly cost of the subscription
 * @property {'monthly' | 'yearly'} billingCycle - Billing cycle of the subscription
 */

/** @type {Subscription[]} */
let subscriptions = [];

app.post("/add-subscription", (req, res) => {
  const { name, monthlyCost, billingCycle } = req.body;

  if (typeof name !== "string") {
    return res.json("Validation error from name")
  }

  if (typeof monthlyCost !== "number") {
    return res.json("Validation error from monthlyCost")
  }

  // if (billingCycle == "monthly" || "yearly") {
  //   return res.json("Validation error from billingCycle")
  // }

  const newObj = {id: subscriptions.length + 1, name, monthlyCost, billingCycle};

  subscriptions.push(newObj);


  return res.json(subscriptions);
})

app.get("/subscriptions", (req, res) => {
  return res.json(subscriptions);
})

app.post("/remove-subscription", (req, res) => {
  subscriptions = subscriptions.filter(item => item.id !== req.body.id);
  return res.json(subscriptions);
})

app.put("/update-subscription", (req, res) => {
  let subscription = subscriptions.find(item => item.id === req.body.id);
  subscription.name = req.body.name || subscription.name;
  subscription.monthlyCost = req.body.monthlyCost || subscription.email;
  subscription.billingCycle = req.body.billingCycle || subscription.age;

  return res.json(subscription);
})

app.get('/calculate', (req, res) => {
    const annualCost = calculateAnnualCost(subscriptions);
    const savingsSuggestion = suggestCancellations(subscriptions, 500);


    return res.json(`Roczny koszt subskrypcji: ${annualCost} zł. Aby zaoszczędzić 500 zł, możesz anulować: ${savingsSuggestion.join(', ')}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})