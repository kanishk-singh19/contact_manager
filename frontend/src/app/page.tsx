"use client";

import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { Contact } from "../types/Contact";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`)
      .then((res) => res.json())
      .then(setContacts);
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${id}`,
      { method: "DELETE" }
    );

    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Contact Manager
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <ContactForm onAdd={(c) => setContacts([c, ...contacts])} />
        <ContactList contacts={contacts} onDelete={handleDelete} />
      </div>
    </main>
  );
}
