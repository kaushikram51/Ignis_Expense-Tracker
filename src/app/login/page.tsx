"use client";

import { loginUser } from "@/app/actions";
import Link from "next/link";
import { useState } from "react";
import { Flame } from "lucide-react";

export default function Login() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      await loginUser(formData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to log in";
      setError(errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ paddingTop: '8vh' }}>
      <div className="sidebar-logo mb-12" style={{ fontSize: 64 }}>
        <Flame color="#ff0033" size={64} />
        IGNIS
      </div>
      <div className="glass-card w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        {error && <div className="text-neon mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex-col">
            <label className="text-sm text-secondary mb-1">Email</label>
            <input type="email" name="email" className="form-input" required />
          </div>
          <div className="flex-col mb-4">
            <label className="text-sm text-secondary mb-1">Password</label>
            <input type="password" name="password" className="form-input" required />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
        <div className="text-center mt-6 text-secondary">
          Don&apos;t have an account? <Link href="/signup" className="text-neon hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
