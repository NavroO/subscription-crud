import express from "express";
import morgan from "morgan";
import Joi from "joi";
import {calculateAnnualCost, suggestCancellations} from "./calculation.js"

const app = express()
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());

const createSubscriptionSchema = Joi.object({
  name: Joi.string().required(),
  monthlyCost: Joi.number().required(),
  billingCycle: Joi.string().valid('monthly', 'yearly').required()
})

const removeSubscriptionSchema = Joi.object({
  id: Joi.number().required(),
})

const updateSubscriptionSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  monthlyCost: Joi.number().required(),
  billingCycle: Joi.string().valid('monthly', 'yearly').required()
})


/**
 * @typedef {Object} Subscription
 * @property {string} name - Name of the subscription
 * @property {number} monthlyCost - Monthly cost of the subscription
 * @property {'monthly' | 'yearly'} billingCycle - Billing cycle of the subscription
 */

/** @type {Subscription[]} */
let subscriptions = [];

app.post("/add-subscription", (req, res) => {
  const { error, value } = createSubscriptionSchema.validate(req.body)

  if (error) {
    return res.status(400).json({error: error.details})
  }

  subscriptions.push({id: subscriptions.length + 1, ...value});
  return res.json({message: "Subscription created", data: value})
})

app.get("/subscriptions", (req, res) => {
  return res.json(subscriptions);
})

app.post("/remove-subscription", (req, res) => {
  const { error, value } = removeSubscriptionSchema.validate(req.body)

  if (error) {
    return res.status(400).json({error: error.details})
  }

  subscriptions = subscriptions.filter(item => item.id !== value.id);
  return res.json({message: "Subscription remove", data: value})
})

app.put("/update-subscription", (req, res) => {
  const { error, value } = updateSubscriptionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({error: error.details})
  }

  let subscription = subscriptions.find(item => item.id === value.id);
  subscription.name = value.name || subscription.name;
  subscription.monthlyCost = value.monthlyCost || subscription.email;
  subscription.billingCycle = value.billingCycle || subscription.age;

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