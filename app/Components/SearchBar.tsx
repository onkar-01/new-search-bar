import React, { useState } from "react";
import { Search, X } from "lucide-react"; // icon library: lucide-react

const data = [
  { id: 1, type: "person", name: "Caroline Dribsson", status: "Unactivated" },
  { id: 2, type: "person", name: "Adam Cadribean", status: "Active 1w ago" },
  { id: 3, type: "file", name: "final_dribbble_presentation.jpg", status: "Edited 1w ago" },
  { id: 4, type: "person", name: "Margareth Cendribbssen", status: "Active 1w ago" },
  { id: 5, type: "file", name: "dribbble_animation.avi", status: "Added 1y ago" },
  { id: 6, type: "folder", name: "Dribbble Folder", status: "Edited 2m ago" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { name: "All", count: data.length },
    { name: "Files", count: data.filter(d => d.type === "file").length },
    { name: "People", count: data.filter(d => d.type === "person").length },
  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {/* Search Input */}
      <div className="flex items-center rounded-xl border bg-white px-3 py-2 shadow">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="ml-2 w-full outline-none text-sm"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-sm text-gray-500 hover:underline">
            Clear
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mt-3 border-b">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`pb-2 text-sm ${
              activeTab === tab.name ? "border-b-2 border-black font-medium" : "text-gray-500"
            }`}
          >
            {tab.name} <span className="text-gray-400">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-3 rounded-xl bg-white shadow p-3 space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map(item => {
            const highlighted = item.name.replace(
              new RegExp(query, "gi"),
              match => `<mark class="bg-yellow-200">${match}</mark>`
            );

            return (
              <div key={item.id} className="text-sm">
                <p
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
                <p className="text-xs text-gray-500">{item.status}</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-sm">No results found.</p>
        )}
      </div>
    </div>
  );
}
