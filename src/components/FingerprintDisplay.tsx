"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/StoreProvider";
import type React from "react";

export default function FingerprintDisplay() {
  const { fingerprint, isLoaded, isLoading, error, collectFingerprint } =
    useAppStore((state) => state);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    if (!isLoaded) collectFingerprint(consentGiven);
  }, [isLoaded, collectFingerprint, consentGiven]);

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConsent = e.target.checked;
    setConsentGiven(newConsent);
    if (fingerprint) {
      collectFingerprint(newConsent);
    }
  };

  if (error) return <ErrorDisplay error={error} />;
  if (isLoading || !isLoaded || !fingerprint) return <LoadingDisplay />;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl shadow-xl border border-gray-200">
      {/* Compact Header */}
      <div className="text-center mb-4 pb-3 border-b border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Device Fingerprint Analysis
        </h2>
        <p className="text-gray-600 text-xs">
          Real-time device and network identification
        </p>
      </div>

      {/* Desktop: Two column layout, Mobile: Single column */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <ConsentBanner
            consentGiven={consentGiven}
            onChange={handleConsentChange}
          />

          {/* Visitor Information Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-4 border border-emerald-200 shadow-md">
            <div className="flex items-center mb-3 pb-2 border-b border-emerald-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              <h3 className="text-lg font-bold text-emerald-800">
                Visitor Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DataCard
                label="Visitor ID"
                value={fingerprint.visitorId || "Generating..."}
                bgColor="bg-white/60"
                borderColor="border-emerald-200"
              />
              <DataCard
                label="Visit Count"
                value={fingerprint.visitCount.toString()}
                bgColor="bg-white/60"
                borderColor="border-emerald-200"
              />
              <DataCard
                label="Last Seen"
                value={new Date(fingerprint.timestamp).toLocaleString()}
                bgColor="bg-white/60"
                borderColor="border-emerald-200"
              />
              <DataCard
                label="Trust Score"
                value={`${fingerprint.trustScore}%`}
                bgColor="bg-white/60"
                borderColor="border-emerald-200"
              />
            </div>
          </div>

          {/* Device Information Section */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg p-4 border border-gray-300 shadow-md">
            <div className="flex items-center mb-3 pb-2 border-b border-gray-400">
              <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
              <h3 className="text-lg font-bold text-gray-700">
                Device Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <DataCard
                label="Device Type"
                value={fingerprint.deviceType}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="OS Model"
                value={fingerprint.osModel}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Browser"
                value={fingerprint.browserInfo}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Window Resolution"
                value={fingerprint.windowInnerResolution}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Screen Orientation"
                value={fingerprint.screenOrientation}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Language"
                value={fingerprint.language}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Timezone"
                value={fingerprint.timezone}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="CPU Cores"
                value={fingerprint.hardwareConcurrency.toString()}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Device Memory"
                value={
                  fingerprint.deviceMemory
                    ? `${fingerprint.deviceMemory} GB`
                    : "Unavailable"
                }
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
              <DataCard
                label="Platform"
                value={fingerprint.platform}
                bgColor="bg-white/80"
                borderColor="border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 mt-4 lg:mt-0">
          {/* Host Network Information Section */}
          {consentGiven && fingerprint.serverData && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-4 border border-amber-300 shadow-md">
              <div className="flex items-center mb-3 pb-2 border-b border-amber-400">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                <h3 className="text-lg font-bold text-amber-800">
                  Host Network Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DataCard
                  label="IP Address"
                  value={fingerprint.serverData.network.ip}
                  bgColor="bg-white/70"
                  borderColor="border-amber-200"
                />
                <DataCard
                  label="ISP"
                  value={fingerprint.serverData.network.as_name || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-amber-200"
                />
                <DataCard
                  label="ISP Domain"
                  value={fingerprint.serverData.network.as_domain || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-amber-200"
                />
                <DataCard
                  label="Country"
                  value={fingerprint.serverData.network.country || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-amber-200"
                />
                <DataCard
                  label="Continent"
                  value={fingerprint.serverData.network.continent || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-amber-200"
                />
                <DataCard
                  label="Environment"
                  value={
                    fingerprint.serverData.deployment.environment || "Unknown"
                  }
                  bgColor="bg-white/70"
                  borderColor="border-amber-200"
                />
              </div>
            </div>
          )}

          {/* Visitor Network Information Section */}
          {consentGiven && fingerprint.visitorNetwork && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-300 shadow-md">
              <div className="flex items-center mb-3 pb-2 border-b border-blue-400">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <h3 className="text-lg font-bold text-blue-800">
                  Visitor Network Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DataCard
                  label="IP Address"
                  value={fingerprint.visitorNetwork.ip}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
                <DataCard
                  label="City"
                  value={fingerprint.visitorNetwork.city || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
                <DataCard
                  label="Region"
                  value={fingerprint.visitorNetwork.region || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
                <DataCard
                  label="Country"
                  value={fingerprint.visitorNetwork.country || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
                <DataCard
                  label="Location"
                  value={fingerprint.visitorNetwork.location || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
                <DataCard
                  label="ISP"
                  value={fingerprint.visitorNetwork.isp || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
                <DataCard
                  label="Timezone"
                  value={fingerprint.visitorNetwork.timezone || "Unknown"}
                  bgColor="bg-white/70"
                  borderColor="border-blue-200"
                />
              </div>
            </div>
          )}

          {/* No Consent Message */}
          {!consentGiven && (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 border border-dashed border-gray-400 shadow-inner text-center">
              <div className="text-gray-500 mb-2">
                <svg
                  className="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m0 0v2m0-2h2m-2 0H10m8-9a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-700 mb-1">
                Network Information Available
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enable consent above to view detailed network and location
                information. All data is processed securely and anonymized.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DataCard = ({
  label,
  value,
  bgColor = "bg-white",
  borderColor = "border-gray-200",
}: {
  label: string;
  value?: string;
  bgColor?: string;
  borderColor?: string;
}) => (
  <div
    className={`${bgColor} ${borderColor} border rounded-md p-2 hover:shadow-sm transition-all duration-200`}
  >
    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
      {label}
    </div>
    <div className="text-xs font-medium text-gray-900 break-words leading-tight">
      {value || "Unknown"}
    </div>
  </div>
);

const LoadingDisplay = () => (
  <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl shadow-xl border border-gray-200">
    {/* Header Loading */}
    <div className="text-center mb-4 pb-3 border-b border-gray-200">
      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-80 mx-auto animate-pulse mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
    </div>

    {/* Loading Status Banner */}
    <div className="text-center mb-6">
      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200 shadow-md">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
        <span className="text-blue-800 font-semibold text-sm">
          Loading fingerprint data...
        </span>
      </div>
    </div>

    {/* Two column skeleton layout */}
    <div className="lg:grid lg:grid-cols-2 lg:gap-6">
      {/* Left Column Skeleton */}
      <div className="space-y-4">
        {/* Consent Banner Skeleton */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200 shadow-md">
          <div className="flex items-start">
            <div className="w-4 h-4 bg-blue-300 rounded mr-3 mt-0.5 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-blue-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-blue-100 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Visitor Information Skeleton */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-4 border border-emerald-200 shadow-md">
          <div className="flex items-center mb-3 pb-2 border-b border-emerald-300">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            <div className="h-4 bg-emerald-200 rounded w-40 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/60 border border-emerald-200 rounded-md p-2"
              >
                <div className="h-2 bg-emerald-200 rounded w-12 mb-1 animate-pulse"></div>
                <div className="h-3 bg-emerald-100 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Information Skeleton */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg p-4 border border-gray-300 shadow-md">
          <div className="flex items-center mb-3 pb-2 border-b border-gray-400">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-36 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/80 border border-gray-200 rounded-md p-2"
              >
                <div className="h-2 bg-gray-300 rounded w-16 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className="space-y-4 mt-4 lg:mt-0">
        {/* Network sections skeleton */}
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`${
              sectionIndex === 0
                ? "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300"
                : "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300"
            } rounded-lg p-4 border shadow-md`}
          >
            <div
              className={`flex items-center mb-3 pb-2 ${
                sectionIndex === 0 ? "border-amber-400" : "border-blue-400"
              } border-b`}
            >
              <div
                className={`w-2 h-2 ${
                  sectionIndex === 0 ? "bg-amber-400" : "bg-blue-400"
                } rounded-full mr-2 animate-pulse`}
              ></div>
              <div
                className={`h-4 ${
                  sectionIndex === 0 ? "bg-amber-200" : "bg-blue-200"
                } rounded w-44 animate-pulse`}
              ></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-white/70 ${
                    sectionIndex === 0 ? "border-amber-200" : "border-blue-200"
                  } border rounded-md p-2`}
                >
                  <div
                    className={`h-2 ${
                      sectionIndex === 0 ? "bg-amber-200" : "bg-blue-200"
                    } rounded w-12 mb-1 animate-pulse`}
                  ></div>
                  <div
                    className={`h-3 ${
                      sectionIndex === 0 ? "bg-amber-100" : "bg-blue-100"
                    } rounded w-20 animate-pulse`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Enhanced Loading Indicators */}
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
        {[
          "Collecting device information",
          "Generating visitor ID",
          "Processing fingerprint",
        ].map((text, i) => (
          <div
            key={i}
            className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm border border-gray-200"
          >
            <div
              className="animate-pulse h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
            <span className="font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-red-50 to-rose-100 rounded-xl border border-red-200 shadow-lg">
    <div className="text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-200">
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-red-800 mb-2">
        Error Loading Fingerprint
      </h3>
      <div className="bg-white/60 rounded-lg p-3 border border-red-200 mb-3">
        <p className="text-red-700 font-medium text-sm">{error}</p>
      </div>
      <p className="text-red-600 text-xs">
        Please refresh the page to try again.
      </p>
    </div>
  </div>
);

const ConsentBanner = ({
  consentGiven,
  onChange,
}: {
  consentGiven: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200 shadow-md">
    <div className="flex items-start">
      <div className="flex items-center h-5 mt-0.5">
        <input
          id="consent-checkbox"
          type="checkbox"
          checked={consentGiven}
          onChange={onChange}
          className="focus:ring-blue-500 focus:ring-2 h-4 w-4 text-blue-600 border border-blue-300 rounded transition-all duration-200"
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor="consent-checkbox"
          className="font-bold text-blue-800 cursor-pointer"
        >
          Enhanced Fingerprinting Consent
        </label>
        <p className="text-blue-700 mt-0.5 leading-relaxed text-xs">
          Check this box to allow collection of network information (anonymized
          IP, location). This helps provide more detailed analysis while
          maintaining your privacy.
        </p>
      </div>
    </div>
  </div>
);
