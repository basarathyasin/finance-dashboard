const Record = require("./records.model");
const createError = require("../../utils/create-error");

function buildRecordResponse(record) {
  return {
    id: record._id,
    amount: record.amount,
    type: record.type,
    category: record.category,
    date: record.date,
    note: record.note,
    createdBy: record.createdBy,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

function buildFilters(query, userId) {
  const filters = {
    createdBy: userId,
  };

  if (query.type) {
    filters.type = query.type;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.date) {
    const startDate = new Date(query.date);

    if (!Number.isNaN(startDate.getTime())) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      filters.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }
  }

  return filters;
}

function getPagination(query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

async function createRecord(recordData, userId) {
  const record = await Record.create({
    amount: recordData.amount,
    type: recordData.type,
    category: recordData.category,
    date: recordData.date,
    note: recordData.note || "",
    createdBy: userId,
  });

  return {
    message: "Record created successfully",
    record: buildRecordResponse(record),
  };
}

async function getRecords(query, userId) {
  const filters = buildFilters(query, userId);
  const { page, limit, skip } = getPagination(query);

  const [records, totalRecords] = await Promise.all([
    Record.find(filters)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Record.countDocuments(filters),
  ]);

  return {
    records: records.map(buildRecordResponse),
    pagination: {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit) || 1,
    },
  };
}

async function updateRecord(recordId, updateData, userId) {
  const updates = {};

  if (updateData.amount !== undefined) {
    updates.amount = updateData.amount;
  }

  if (updateData.type) {
    updates.type = updateData.type;
  }

  if (updateData.category) {
    updates.category = updateData.category;
  }

  if (updateData.date) {
    updates.date = updateData.date;
  }

  if (updateData.note !== undefined) {
    updates.note = updateData.note;
  }

  if (Object.keys(updates).length === 0) {
    throw createError("At least one record field is required to update", 400);
  }

  const record = await Record.findOneAndUpdate(
    { _id: recordId, createdBy: userId },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!record) {
    throw createError("Record not found", 404);
  }

  return {
    message: "Record updated successfully",
    record: buildRecordResponse(record),
  };
}

async function deleteRecord(recordId, userId) {
  const record = await Record.findOneAndDelete({
    _id: recordId,
    createdBy: userId,
  });

  if (!record) {
    throw createError("Record not found", 404);
  }

  return {
    message: "Record deleted successfully",
  };
}

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};
