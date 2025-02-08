import Joi from "joi";

export const createSubscriptionSchema = Joi.object({
  name: Joi.string().required(),
  monthlyCost: Joi.number().required(),
  billingCycle: Joi.string().valid("monthly", "yearly").required(),
});

export const removeSubscriptionSchema = Joi.object({
  id: Joi.number().required(),
});

export const updateSubscriptionSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  monthlyCost: Joi.number().required(),
  billingCycle: Joi.string().valid("monthly", "yearly").required(),
});
