import api from "./api";

function createQueryString(filters) {
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

const recordsService = {
  getRecords(filters = {}) {
    return api.get(`/records${createQueryString(filters)}`);
  },
  createRecord(payload) {
    return api.post("/records", payload);
  },
  updateRecord(recordId, payload) {
    return api.patch(`/records/${recordId}`, payload);
  },
  deleteRecord(recordId) {
    return api.delete(`/records/${recordId}`);
  },
};

export default recordsService;
