"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to add category");
      }
      setNewCategory("");
      fetchCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete category");
      }
      fetchCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Categories</h1>

      <form
        onSubmit={handleAddCategory}
        className="flex items-center gap-3 mb-6 bg-white p-4 rounded-lg shadow"
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition disabled:opacity-70"
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {categories.length === 0 && (
          <li className="px-4 py-4 text-gray-500 text-center">No categories found.</li>
        )}
        {categories.map((cat, index) => (
          <li
            key={cat.id}
            className={`px-4 py-4 flex justify-between items-center ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <span className="text-gray-800 font-medium">{cat.name}</span>
            <button
              onClick={() => handleDeleteCategory(cat.id)}
              className="text-sm text-red-600 hover:text-red-800"
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
