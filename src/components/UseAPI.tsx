import { use } from "react";
import type { JSX } from "react";

function fetchMessage(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello from the fucking future!");
    }, 5000);
  });
}

async function fetchUser() {
  await new Promise((r) => setTimeout(r, 3000));
  return { id: 17, name: "Trae", age: 42 };
}

// Child async component
function UserProfile(): JSX.Element {
  const user = use(fetchUser());

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-blue-200">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
          {user.name[0]}
        </div>
        User Profile
      </h2>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-gray-600 font-medium w-16">ID:</span>
          <span className="text-gray-800 font-semibold">{user.id}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 font-medium w-16">Name:</span>
          <span className="text-gray-800 font-semibold">{user.name}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 font-medium w-16">Age:</span>
          <span className="text-gray-800 font-semibold">{user.age}</span>
        </div>
      </div>
    </div>
  );
}

export default function UseAPI(): React.JSX.Element {
  const message: string = use(fetchMessage());

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          {message}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
      </div>
      <UserProfile />
    </section>
  );
}
