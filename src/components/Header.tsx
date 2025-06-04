import Link from "next/link";
import RouteSelector from "./RouteSelector";

export default function Header() {
  return (
    <nav className="w-full h-auto flex flex-col justify-center items-center gap-1 md:flex-row md:justify-between py-1 px-4 border-b-2 border-gray-800 bg-gray-300 text-blue-900 mx-auto sticky top-0 z-50">
      <menu className="flex justify-start">
        <Link
          href="/"
          className="flex items-center self-center text-2xl font-semibold whitespace-nowrap  hover:text-green-700"
        >
          React19 Newhooks Fingerprintjs
        </Link>
      </menu>
      <RouteSelector />
    </nav>
  );
}
