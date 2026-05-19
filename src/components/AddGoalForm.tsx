"use client";

import { addGoal } from "@/app/actions";
import { useState, useRef } from "react";
import { PlusCircle } from "lucide-react";

export default function AddGoalForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await addGoal(formData);
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
        Create New Goal
      </h2>
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-4 flex-wrap items-end">
        
        <div className="flex-1 min-w-[200px] flex-col">
          <label className="text-sm text-secondary mb-1">Goal Name</label>
          <input type="text" name="name" className="form-input" required placeholder="e.g. Buy a Tesla" />
        </div>

        <div className="flex-1 min-w-[200px] flex-col">
          <label className="text-sm text-secondary mb-1">Target Amount ($)</label>
          <input type="number" name="targetAmount" step="0.01" className="form-input" required placeholder="0.00" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
