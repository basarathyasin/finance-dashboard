const recordsService = require("./records.service");
const asyncHandler = require("../../utils/async-handler");

module.exports = {
  getRecordsStatus: asyncHandler(async function getRecordsStatus(_req, res) {
    const data = await recordsService.getRecordsStatus();
    res.json(data);
  }),
};
