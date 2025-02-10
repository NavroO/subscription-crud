export const validateRequest = (schema, req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  return value;
};
