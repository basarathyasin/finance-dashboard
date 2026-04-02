const mongoose = require("mongoose");
const createError = require("./create-error");

function requireFields(body, fields) {
  const missingFields = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === "";
  });

  if (missingFields.length > 0) {
    throw createError(`${missingFields.join(", ")} is required`, 400);
  }
}

function validateEnum(value, allowedValues, fieldName) {
  if (value !== undefined && !allowedValues.includes(value)) {
    throw createError(
      `${fieldName} must be one of: ${allowedValues.join(", ")}`,
      400
    );
  }
}

function validateObjectId(id, fieldName) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(`${fieldName} is invalid`, 400);
  }
}

function validateNumber(value, fieldName) {
  if (value !== undefined && (typeof value !== "number" || Number.isNaN(value))) {
    throw createError(`${fieldName} must be a valid number`, 400);
  }
}

function validateDate(value, fieldName) {
  if (value !== undefined) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw createError(`${fieldName} must be a valid date`, 400);
    }
  }
}

module.exports = {
  requireFields,
  validateEnum,
  validateObjectId,
  validateNumber,
  validateDate,
};
