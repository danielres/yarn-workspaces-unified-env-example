import { createError } from "apollo-errors";

const TenantNotFoundError = createError("TenantNotFoundError", {
  message: "The tenant could not be found."
});

export default TenantNotFoundError;
