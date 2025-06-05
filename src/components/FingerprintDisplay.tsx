// src/components/FingerprintDisplay.tsx
"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/StoreProvider";

export default function FingerprintDisplay() {
  const { fingerprint, isLoaded, error, collectFingerprint, resetFingerprint } =
    useAppStore((state) => state);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    if (!isLoaded) collectFingerprint(consentGiven);
  }, [isLoaded, collectFingerprint, consentGiven]);

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConsent = e.target.checked;
    setConsentGiven(newConsent);
    if (isLoaded) {
      resetFingerprint();
      collectFingerprint(newConsent);
    }
  };

  if (error) return <ErrorDisplay error={error} />;
  if (!isLoaded || !fingerprint) return <LoadingDisplay />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Device Fingerprint
      </h2>
      <ConsentBanner
        consentGiven={consentGiven}
        onChange={handleConsentChange}
      />
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Device Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <DataRow label="Device Type" value={fingerprint.deviceType} />
          <DataRow label="OS Model" value={fingerprint.osModel} />
          <DataRow label="Browser" value={fingerprint.browserInfo} />
          <DataRow
            label="Window Resolution"
            value={fingerprint.windowInnerResolution}
          />
          <DataRow
            label="Screen Orientation"
            value={fingerprint.screenOrientation}
          />
          <DataRow label="Language" value={fingerprint.language} />
          <DataRow label="Timezone" value={fingerprint.timezone} />
          <DataRow
            label="CPU Cores"
            value={fingerprint.hardwareConcurrency.toString()}
          />
          <DataRow
            label="Device Memory"
            value={
              fingerprint.deviceMemory
                ? `${fingerprint.deviceMemory} GB`
                : "Unavailable"
            }
          />
          <DataRow label="Platform" value={fingerprint.platform} />
          <DataRow label="Trust Score" value={`${fingerprint.trustScore}%`} />
          <DataRow
            label="Timestamp"
            value={new Date(fingerprint.timestamp).toLocaleString()}
          />
        </div>
      </div>
      // In the FingerprintDisplay component's JSX
      {consentGiven && fingerprint.serverData && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Network Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <DataRow
              label="IP Address"
              value={fingerprint.serverData.network.ip}
            />
            <DataRow
              label="Country"
              value={fingerprint.serverData.network.country}
            />
            <DataRow
              label="Region"
              value={fingerprint.serverData.network.region}
            />
            <DataRow label="City" value={fingerprint.serverData.network.city} />
            <DataRow
              label="User Agent"
              value={fingerprint.serverData.request.userAgent || "Unknown"}
            />
            <DataRow
              label="Preferred Language"
              value={fingerprint.serverData.request.acceptLanguage || "Unknown"}
            />
            <DataRow
              label="Referrer"
              value={fingerprint.serverData.request.referrer || "Direct"}
            />
            <DataRow
              label="Environment"
              value={fingerprint.serverData.deployment.environment || "Unknown"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const DataRow = ({ label, value }: { label: string; value?: string }) => (
  <>
    <div className="font-medium text-gray-700">{label}</div>
    <div className="text-gray-900 break-words">{value || "Unknown"}</div>
  </>
);

const LoadingDisplay = () => (
  <div className="max-w-2xl mx-auto p-6 text-center">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg">
    <h3 className="text-lg font-medium text-red-800">Error</h3>
    <p className="text-red-600 mt-2">{error}</p>
    <p className="text-red-500 mt-4">Please refresh the page to try again.</p>
  </div>
);

const ConsentBanner = ({
  consentGiven,
  onChange,
}: {
  consentGiven: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="p-4 bg-blue-50 rounded-lg mb-6">
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="consent-checkbox"
          type="checkbox"
          checked={consentGiven}
          onChange={onChange}
          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="consent-checkbox" className="font-medium text-gray-700">
          Enhanced Fingerprinting Consent
        </label>
        <p className="text-gray-500">
          Check this box to allow collection of network information (anonymized
          IP, location). You can change this anytime.{" "}
          <a href="/privacy" className="text-blue-600 hover:text-blue-500">
            Learn more
          </a>
        </p>
      </div>
    </div>
  </div>
);
