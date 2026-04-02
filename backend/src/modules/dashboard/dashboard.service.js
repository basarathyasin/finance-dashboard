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

module.exports = {
  getDashboardMessage,
  getHealthStatus,
};
