"use client";
import { useEffect } from "react";
import { useAppStore } from "@/store/StoreProvider";

export default function FingerprintDisplay() {
  const { fingerprint, isLoaded, collectFingerprint } = useAppStore(
    (state) => state
  );

  useEffect(() => {
    if (!isLoaded) collectFingerprint();
  }, [isLoaded, collectFingerprint]);

  if (!isLoaded || !fingerprint) return <div>Loading fingerprint data...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Device Fingerprint
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <DataRow label="Device Type" value={fingerprint.deviceType} />
        <DataRow label="OS Model" value={fingerprint.osModel} />
        <DataRow label="Browser" value={fingerprint.browserInfo} />
        <DataRow
          label="Window Inner Resolution"
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
        <DataRow label="Timestamp" value={fingerprint.timestamp} />
      </div>
    </div>
  );
}

const DataRow = ({ label, value }: { label: string; value: string }) => (
  <>
    <div className="font-medium text-gray-700">{label}</div>
    <div className="text-gray-900">{value}</div>
  </>
);
