"use client";
import React, { useState, useTransition } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [lists, setLists] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const LIST_SIZE = 10000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    startTransition(() => {
      const dataList: string[] = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        dataList.push(value);
      }
      setLists(dataList);
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Type something..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="h-[400px] overflow-y-auto border rounded p-2 bg-white">
        {isPending ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          lists.map((list, index) => (
            <div key={index} className="text-sm text-gray-700">
              {list}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
