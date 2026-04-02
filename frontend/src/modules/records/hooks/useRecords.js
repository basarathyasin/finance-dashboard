import { useCallback, useState } from "react";
import recordsService from "../../../services/records";

const defaultFilters = {
  type: "",
  category: "",
  date: "",
};

export function useRecords() {
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRecords = useCallback(async function loadRecords(nextFilters = defaultFilters) {
    setIsLoading(true);
    setError("");

    try {
      const response = await recordsService.getRecords(nextFilters);
      setRecords(response.data.records);
      setFilters(nextFilters);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function createRecord(payload) {
    const response = await recordsService.createRecord(payload);
    await loadRecords(filters);
    return response;
  }

  async function updateRecord(recordId, payload) {
    const response = await recordsService.updateRecord(recordId, payload);
    await loadRecords(filters);
    return response;
  }

  async function deleteRecord(recordId) {
    const response = await recordsService.deleteRecord(recordId);
    await loadRecords(filters);
    return response;
  }

  return {
    records,
    filters,
    isLoading,
    error,
    loadRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}
