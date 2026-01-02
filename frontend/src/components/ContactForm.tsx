"use client";

import { useState } from "react";
import { Contact } from "../types/Contact";

interface Props {
  onAdd: (contact: Contact) => void;
}

export default function ContactForm({ onAdd }: Props) {
  const [form, setForm] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const isValid =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    (!form.email || form.email.includes("@"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    onAdd(data);

    setSuccess("Contact added successfully!");

    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add Contact</h2>

      {success && (
        <div className="mb-4 rounded-md bg-green-900/40 border border-green-600 p-3 text-green-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name *"
          className="w-full rounded-md bg-gray-800 border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full rounded-md bg-gray-800 border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone *"
          className="w-full rounded-md bg-gray-800 border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Message"
          rows={3}
          className="w-full rounded-md bg-gray-800 border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          disabled={!isValid}
          className={`w-full py-2 rounded-md font-medium transition ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
