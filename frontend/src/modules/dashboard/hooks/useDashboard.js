import { useCallback, useState } from "react";
import dashboardService from "../../../services/dashboard";

export function useDashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });
  const [categories, setCategories] = useState([]);
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async function loadDashboard() {
    setIsLoading(true);
    setError("");

    try {
      const [summaryResponse, categoriesResponse, trendsResponse] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getCategories(),
        dashboardService.getTrends(),
      ]);

      setSummary(summaryResponse.data);
      setCategories(categoriesResponse.data.categories);
      setTrends(trendsResponse.data.trends);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    summary,
    categories,
    trends,
    isLoading,
    error,
    loadDashboard,
  };
}
