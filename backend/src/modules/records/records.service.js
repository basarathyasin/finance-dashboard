async function getRecordsStatus() {
  return {
    module: "records",
    status: "ready",
  };
}

module.exports = {
  getRecordsStatus,
};
