// SNIPPET: FormModal — Create / Edit form in a modal overlay
// Props: isOpen, onClose, onSubmit, title, fields
// fields: array of { name, label, type, placeholder, required }

const DEMO_FIELDS = [
  { name: "title", label: "Title", type: "text", placeholder: "Enter title...", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter description..." },
  { name: "category", label: "Category", type: "select", options: ["Type A", "Type B", "Type C"] },
]; // MOCK FIELDS — replace with real fields

import { useState } from "react";

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Create New Item",
  fields = DEMO_FIELDS,
  loading = false,
  error = "",
}) {
  const [form, setForm] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form); // STUB: connect to POST /[resource]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder ?? ""}
                  onChange={handleChange}
                  rows={3}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type ?? "text"}
                  name={field.name}
                  placeholder={field.placeholder ?? ""}
                  required={field.required}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
