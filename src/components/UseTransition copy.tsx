"use client";
import React, { useState, useTransition } from "react";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

const UseTransition: React.FC = () => {
  const [input, setInput] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isPending && (
        <p className="mt-2 text-sm text-gray-500 animate-pulse">Loading...</p>
      )}
      <ul className="mt-4 max-h-[500px] overflow-y-auto space-y-1">
        {filteredItems.map((item, i) => (
          <li key={i} className="p-2 border-b border-gray-100 hover:bg-gray-50">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseTransition;
