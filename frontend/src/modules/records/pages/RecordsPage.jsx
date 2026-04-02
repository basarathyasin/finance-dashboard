import { useEffect, useMemo, useState } from "react";
import RecordForm from "../components/RecordForm";
import RecordsFilterBar from "../components/RecordsFilterBar";
import RecordsTable from "../components/RecordsTable";
import { useRecords } from "../hooks/useRecords";

const emptyRecordForm = {
  amount: "",
  type: "",
  category: "",
  date: "",
  note: "",
};

const emptyFilters = {
  type: "",
  category: "",
  date: "",
};

function formatRecordForForm(record) {
  return {
    amount: record.amount,
    type: record.type,
    category: record.category,
    date: record.date.slice(0, 10),
    note: record.note || "",
  };
}

function RecordsPage() {
  const { records, error, isLoading, loadRecords, createRecord, updateRecord, deleteRecord } =
    useRecords();
  const [filters, setFilters] = useState(emptyFilters);
  const [formData, setFormData] = useState(emptyRecordForm);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    loadRecords(emptyFilters);
  }, [loadRecords]);

  const formTitle = useMemo(
    () => (editingRecord ? "Edit record" : "Add new record"),
    [editingRecord]
  );

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleFilterSubmit(event) {
    event.preventDefault();
    await loadRecords(filters);
  }

  async function handleFilterReset() {
    setFilters(emptyFilters);
    await loadRecords(emptyFilters);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    const payload = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      if (editingRecord) {
        await updateRecord(editingRecord.id, payload);
      } else {
        await createRecord(payload);
      }

      setFormData(emptyRecordForm);
      setEditingRecord(null);
    } catch (requestError) {
      setFormError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(record) {
    setEditingRecord(record);
    setFormError("");
    setFormData(formatRecordForForm(record));
  }

  function handleCancelEdit() {
    setEditingRecord(null);
    setFormError("");
    setFormData(emptyRecordForm);
  }

  async function handleDelete(record) {
    setDeletingId(record.id);

    try {
      await deleteRecord(record.id);

      if (editingRecord?.id === record.id) {
        handleCancelEdit();
      }
    } catch (requestError) {
      setFormError(requestError.message);
    } finally {
      setDeletingId("");
    }
  }

  return (
    <section className="records-page">
      <RecordsFilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
        onSubmit={handleFilterSubmit}
      />

      <div className="records-layout">
        <RecordForm
          error={formError}
          formData={formData}
          isSubmitting={isSubmitting}
          onCancel={editingRecord ? handleCancelEdit : null}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          submitLabel={editingRecord ? "Update record" : "Create record"}
          title={formTitle}
        />

        <div className="records-content">
          {isLoading ? <div className="empty-state-card">Loading records...</div> : null}
          {!isLoading && error ? (
            <div className="empty-state-card">
              <h3>Could not load records</h3>
              <p>{error}</p>
            </div>
          ) : null}
          {!isLoading && !error ? (
            <RecordsTable
              deletingId={deletingId}
              onDelete={handleDelete}
              onEdit={handleEdit}
              records={records}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default RecordsPage;
