export default function Footer() {
  return (
    <section className="w-full h-auto bg-[#78A9F6] flex justify-center">
      <footer className="p-2 flex flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm border-t-2 border-solid border-gray-800 bg-[#9CC3FF] text-blue-900 w-full max-w-[1440px]">
        <a
          href="https://github.com/traez/react19-new-hooks"
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
    </section>
  );
}
