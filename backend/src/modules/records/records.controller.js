const recordsService = require("./records.service");
const asyncHandler = require("../../utils/async-handler");
const createError = require("../../utils/create-error");
const sendResponse = require("../../utils/send-response");
const {
  requireFields,
  validateEnum,
  validateObjectId,
  validateNumber,
  validateDate,
} = require("../../utils/validation");

function validateCreateRecordBody(body) {
  requireFields(body, ["amount", "type", "category", "date"]);
  validateNumber(body.amount, "amount");
  validateEnum(body.type, ["income", "expense"], "type");
  validateDate(body.date, "date");
}

function validatePaginationQuery(query) {
  if (query.page !== undefined) {
    const page = Number(query.page);

    if (!Number.isInteger(page) || page < 1) {
      throw createError("page must be a positive integer", 400);
    }
  }

  if (query.limit !== undefined) {
    const limit = Number(query.limit);

    if (!Number.isInteger(limit) || limit < 1) {
      throw createError("limit must be a positive integer", 400);
    }
  }
}

function validateUpdateRecordBody(body) {
  if (
    body.amount === undefined &&
    body.type === undefined &&
    body.category === undefined &&
    body.date === undefined &&
    body.note === undefined
  ) {
    throw createError(
      "amount, type, category, date or note is required to update the record",
      400
    );
  }

  validateNumber(body.amount, "amount");
  validateEnum(body.type, ["income", "expense"], "type");
  validateDate(body.date, "date");
}

module.exports = {
  createRecord: asyncHandler(async function createRecord(req, res) {
    validateCreateRecordBody(req.body);
    const data = await recordsService.createRecord(req.body, req.user._id);
    sendResponse(res, 201, data.message, {
      record: data.record,
    });
  }),
  getRecords: asyncHandler(async function getRecords(req, res) {
    validateEnum(req.query.type, ["income", "expense"], "type");
    validateDate(req.query.date, "date");
    validatePaginationQuery(req.query);
    const data = await recordsService.getRecords(req.query, req.user._id);
    sendResponse(res, 200, "Records fetched successfully", data);
  }),
  updateRecord: asyncHandler(async function updateRecord(req, res) {
    validateObjectId(req.params.id, "record id");
    validateUpdateRecordBody(req.body);
    const data = await recordsService.updateRecord(
      req.params.id,
      req.body,
      req.user._id
    );
    sendResponse(res, 200, data.message, {
      record: data.record,
    });
  }),
  deleteRecord: asyncHandler(async function deleteRecord(req, res) {
    validateObjectId(req.params.id, "record id");
    const data = await recordsService.deleteRecord(req.params.id, req.user._id);
    sendResponse(res, 200, data.message);
  }),
};
