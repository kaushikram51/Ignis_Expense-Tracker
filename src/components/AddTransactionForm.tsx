"use client";

import { addTransaction } from "@/app/actions";
import { useState, useRef } from "react";
import { PlusCircle } from "lucide-react";

export default function AddTransactionForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await addTransaction(formData);
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <PlusCircle size={24} color="#ff0033" />
        Add Transaction
      </h2>
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-4 flex-wrap items-end">
        
        <div className="flex-1 min-w-[150px] flex-col">
          <label className="text-sm text-secondary mb-1">Type</label>
          <select name="type" className="form-input" required>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income / Pocket Money</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px] flex-col">
          <label className="text-sm text-secondary mb-1">Amount ($)</label>
          <input type="number" name="amount" step="0.01" className="form-input" required placeholder="0.00" />
        </div>

        <div className="flex-1 min-w-[150px] flex-col">
          <label className="text-sm text-secondary mb-1">Category</label>
          <select name="category" className="form-input" required defaultValue="Food">
            <option value="Food" style={{ background: '#121212' }}>Food</option>
            <option value="Entertainment" style={{ background: '#121212' }}>Entertainment</option>
            <option value="Movies" style={{ background: '#121212' }}>Movies</option>
            <option value="Transport" style={{ background: '#121212' }}>Transport</option>
            <option value="Shopping" style={{ background: '#121212' }}>Shopping</option>
            <option value="Bills" style={{ background: '#121212' }}>Bills</option>
            <option value="Salary" style={{ background: '#121212' }}>Salary</option>
            <option value="Other" style={{ background: '#121212' }}>Other</option>
          </select>
        </div>

        <div className="flex-2 min-w-[200px] flex-col">
          <label className="text-sm text-secondary mb-1">Description (Optional)</label>
          <input type="text" name="description" className="form-input" placeholder="e.g. Weekly allowance" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}
