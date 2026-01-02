import { Contact } from "../types/Contact";

interface Props {
  contacts: Contact[];
  onDelete: (id: string) => void;
}

export default function ContactList({ contacts, onDelete }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Saved Contacts</h2>

      {contacts.length === 0 ? (
        <p className="text-gray-400">No contacts added yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-3 border-b border-gray-700">Name</th>
              <th className="p-3 border-b border-gray-700">Email</th>
              <th className="p-3 border-b border-gray-700">Phone</th>
              <th className="p-3 border-b border-gray-700">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="hover:bg-gray-800 transition">
                <td className="p-3 border-b border-gray-700">{c.name}</td>
                <td className="p-3 border-b border-gray-700">{c.email}</td>
                <td className="p-3 border-b border-gray-700">{c.phone}</td>
                <td className="p-3 border-b border-gray-700">
                  <button
                    onClick={() => onDelete(c._id!)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
