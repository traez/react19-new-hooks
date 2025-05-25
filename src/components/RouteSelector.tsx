"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const routes = [
  { path: "/", label: "Home" },
  { path: "/use", label: "use API" },
  { path: "/use-action-state", label: "UseActionState" },
  { path: "/use-form-status", label: "UseFormStatus" },
  { path: "/use-optimistic", label: "UseOptimistic" },
  { path: "/use-ref", label: "UseRef" },
];

export default function RouteSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRoute, setSelectedRoute] = useState(pathname);

  useEffect(() => {
    setSelectedRoute(pathname);
  }, [pathname]);

  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRoute = event.target.value;
    setSelectedRoute(newRoute);
    router.push(newRoute);
  };

  return (
    <div className="relative">
      <select
        value={selectedRoute}
        onChange={(e) => handleRouteChange(e)}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {routes.map((route) => (
          <option key={route.path} value={route.path}>
            {route.label}
          </option>
        ))}
      </select>
      <aside className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </aside>
    </div>
  );
}
