import Link from "next/link";
import RouteSelector from "./RouteSelector";

export default function Header() {
  return (
    <section className="w-full h-auto bg-[#78A9F6] flex justify-center">
      <nav className="w-full max-w-[1440px] flex flex-col justify-center items-center gap-1 md:flex-row md:justify-between py-1 px-4 border-b-2 border-gray-800  bg-gray-300  text-blue-900  ">
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
    </section>
  );
}
