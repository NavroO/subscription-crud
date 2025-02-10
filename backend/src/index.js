import express from "express";
import morgan from "morgan";
import { calculateAnnualCost, suggestCancellations } from "./calculation.js";
import {
  createSubscriptionSchema,
  removeSubscriptionSchema,
  updateSubscriptionSchema,
} from "./validators/subscriptionValidator.js";
import { subscriptions } from "./types/subscriptions.js";
import { validateRequest } from "./helpers/helpers.js";

const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json());

app.post("/add-subscription", (req, res) => {
  const value = validateRequest(createSubscriptionSchema, req, res);
  if (!value) return;

  subscriptions.push({ id: subscriptions.length + 1, ...value });
  return res.json({ message: "Subscription created", data: value });
});

app.get("/subscriptions", (req, res) => {
  return res.json(subscriptions);
});

app.post("/remove-subscription", (req, res) => {
  const value = validateRequest(removeSubscriptionSchema, req, res);
  if (!value) return;

  const indexToRemove = subscriptions.findIndex((item) => item.id === value.id);
  if (indexToRemove === -1) {
    return res.status(404).json({ error: "Subscription not found" });
  }

  subscriptions.splice(indexToRemove, 1);
  return res.json({ message: "Subscription removed", data: value });
});

app.put("/update-subscription", (req, res) => {
  const value = validateRequest(updateSubscriptionSchema, req, res);
  if (!value) return;

  const subscriptionIndex = subscriptions.findIndex(
    (item) => item.id === value.id
  );
  if (subscriptionIndex === -1) {
    return res.status(404).json({ error: "Subscription not found" });
  }

  const updatedSubscription = {
    ...subscriptions[subscriptionIndex],
    ...value,
  };

  subscriptions[subscriptionIndex] = updatedSubscription;
  return res.json(updatedSubscription);
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
