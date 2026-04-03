const mongoose = require("mongoose");
const Record = require("../records/records.model");

function getUserMatch(userId) {
  return {
    createdBy: new mongoose.Types.ObjectId(userId),
  };
}

async function getDashboardMessage() {
  return {
    message: "Finance Dashboard API is running",
  };
}

async function getHealthStatus() {
  return {
    status: "ok",
    service: "finance-dashboard-backend",
    timestamp: new Date().toISOString(),
  };
}

async function getSummary(userId) {
  // One aggregation is enough here, so we calculate income and expense together
  // and derive net balance in code to keep the pipeline easy to read.
  const [result] = await Record.aggregate([
    {
      $match: getUserMatch(userId),
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
  ]);

  const totalIncome = result ? result.totalIncome : 0;
  const totalExpense = result ? result.totalExpense : 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
}

async function getCategories(userId) {
  const categories = await Record.aggregate([
    {
      $match: getUserMatch(userId),
    },
    {
      $group: {
        _id: {
          type: "$type",
          category: "$category",
        },
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id.type",
        category: "$_id.category",
        totalAmount: 1,
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);

  return {
    categories,
  };
}

async function getTrends(userId) {
  const trends = await Record.aggregate([
    {
      $match: getUserMatch(userId),
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const groupedTrends = {};

  trends.forEach((item) => {
    // Mongo groups income and expense separately, so we reshape them into
    // one month object for the dashboard card.
    const month = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;

    if (!groupedTrends[month]) {
      groupedTrends[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    groupedTrends[month][item._id.type] = item.totalAmount;
  });

  return {
    trends: Object.values(groupedTrends).map((item) => ({
      ...item,
      netBalance: item.income - item.expense,
    })),
  };
}

module.exports = {
  getDashboardMessage,
  getHealthStatus,
  getSummary,
  getCategories,
  getTrends,
};
