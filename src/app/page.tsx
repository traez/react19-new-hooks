import FingerprintDisplay from "@/components/FingerprintDisplay";

export default function Home() {
  return (
    <div className="w-full h-auto bg-[#8297a1]">
      <section className="flex flex-col justify-between items-center py-2 px-8 bg-white w-full max-w-[1440px] min-h-[calc(100vh-84.96px)] mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border-2 border-blue-200 shadow-xl w-full max-w-4xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
              <h1 className="text-3xl font-bold text-blue-800">
                Fingerprinting Demo
              </h1>
            </div>
            <p className="text-blue-700 text-lg leading-relaxed">
              Landing Page with Finger Printing in action.
              <br />
              Check drop downs for React 19 Hooks pages
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex-1 my-4">
          <FingerprintDisplay />
        </div>
      </section>
    </div>
  );
}
