//import Image from "next/image";
import FingerprintDisplay from "@/components/FingerprintDisplay";

{
  /* <Image
  className="dark:invert"
  src="/next.svg"
  alt="Next.js logo"
  width={180}
  height={38}
  priority
/>; */
}

export default function Home() {
  return (
    <>
      <div className="w-full h-auto bg-[#8297a1]">
        <section className="flex flex-col justify-between items-center py-4 px-8 bg-white w-full max-w-[1440px] min-h-[calc(100vh-84.96px)] mx-auto">
          <h1>Trae Zeeofor</h1>
          <p>
            Landing Page will show Finger Print in action, then check drop down
            fo rother pages focused on new React 19 Hooks
          </p>
          <FingerprintDisplay />
        </section>
      </div>
    </>
  );
}
