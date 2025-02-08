import express from "express";
import morgan from "morgan";
import { calculateAnnualCost, suggestCancellations } from "./calculation.js";
import {
  createSubscriptionSchema,
  removeSubscriptionSchema,
  updateSubscriptionSchema,
} from "./validators/subscriptionValidator.js";

const app = express();
const port = 3000;
app.use(morgan("dev"));
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
  const { error, value } = createSubscriptionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  subscriptions.push({ id: subscriptions.length + 1, ...value });
  return res.json({ message: "Subscription created", data: value });
});

app.get("/subscriptions", (req, res) => {
  return res.json(subscriptions);
});

app.post("/remove-subscription", (req, res) => {
  const { error, value } = removeSubscriptionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  subscriptions = subscriptions.filter((item) => item.id !== value.id);
  return res.json({ message: "Subscription remove", data: value });
});

app.put("/update-subscription", (req, res) => {
  const { error, value } = updateSubscriptionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  const subscriptionIndex = subscriptions.findIndex(
    (item) => item.id === value.id
  );

  if (subscriptionIndex === -1) {
    return res.status(404).json({ error: "Subscription not found" });
  }

  const subscription = subscriptions[subscriptionIndex];
  const updatedSubscription = {
    ...subscription,
    name: value.name || subscription.name,
    monthlyCost: value.monthlyCost || subscription.monthlyCost,
    billingCycle: value.billingCycle || subscription.billingCycle,
  };

  subscriptions[subscriptionIndex] = updatedSubscription;
  return res.json(subscription);
});

app.get("/calculate", (req, res) => {
  const annualCost = calculateAnnualCost(subscriptions);
  const savingsSuggestion = suggestCancellations(subscriptions, 500);

  return res.json(
    `Roczny koszt subskrypcji: ${annualCost} zł. Aby zaoszczędzić 500 zł, możesz anulować: ${savingsSuggestion.join(
      ", "
    )}`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
