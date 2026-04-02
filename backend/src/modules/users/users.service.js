async function getUsersStatus() {
  return {
    module: "users",
    status: "ready",
  };
}

module.exports = {
  getUsersStatus,
};
