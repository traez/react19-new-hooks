export default function Footer() {
  return (
    <footer className="p-2 flex flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm border-t-2 border-solid border-gray-800 bg-[#78A9F6] text-blue-900 w-full h-auto mx-auto">
      <a
        href="https://github.com/traez/react19-newhooks-fingerprintjs"
        target="_blank"
        rel="noopener noreferrer"
        className=" hover:underline hover:text-blue-900 font-bold text-black"
      >
        Source Code
      </a>
      <b>
        <span>© {new Date().getFullYear()}</span> Trae Zeeofor
      </b>
    </footer>
  );
}
