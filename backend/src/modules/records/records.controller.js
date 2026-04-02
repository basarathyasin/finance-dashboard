const recordsService = require("./records.service");
const asyncHandler = require("../../utils/async-handler");
const createError = require("../../utils/create-error");

function validateCreateRecordBody(body) {
  const { amount, type, category, date } = body;

  if (
    amount === undefined ||
    !type ||
    !category ||
    !date
  ) {
    throw createError("amount, type, category and date are required", 400);
  }
}

module.exports = {
  createRecord: asyncHandler(async function createRecord(req, res) {
    validateCreateRecordBody(req.body);
    const data = await recordsService.createRecord(req.body, req.user._id);
    res.status(201).json(data);
  }),
  getRecords: asyncHandler(async function getRecords(req, res) {
    const data = await recordsService.getRecords(req.query, req.user._id);
    res.json(data);
  }),
  updateRecord: asyncHandler(async function updateRecord(req, res) {
    const data = await recordsService.updateRecord(
      req.params.id,
      req.body,
      req.user._id
    );
    res.json(data);
  }),
  deleteRecord: asyncHandler(async function deleteRecord(req, res) {
    const data = await recordsService.deleteRecord(req.params.id, req.user._id);
    res.json(data);
  }),
};
