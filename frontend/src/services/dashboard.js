import api from "./api";

const dashboardService = {
  getSummary() {
    return api.get("/dashboard/summary");
  },
  getCategories() {
    return api.get("/dashboard/categories");
  },
  getTrends() {
    return api.get("/dashboard/trends");
  },
};

export default dashboardService;
