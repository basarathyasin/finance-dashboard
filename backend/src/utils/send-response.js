function sendResponse(res, statusCode, message, data) {
  const response = {
    success: statusCode < 400,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
}

module.exports = sendResponse;
