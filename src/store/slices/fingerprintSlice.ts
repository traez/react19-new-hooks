// src/store/slices/fingerprintSlice.ts
import type { StateCreator } from "zustand";

export interface FingerprintData {
  deviceType: string;
  osModel: string;
  browserInfo: string;
  windowInnerResolution: string;
  screenOrientation: string;
  language: string;
  timezone: string;
  hardwareConcurrency: number;
  deviceMemory?: number;
  platform: string;
  trustScore: number;
  timestamp: string;
}

export interface FingerprintSliceType {
  fingerprint: FingerprintData | null;
  isLoaded: boolean;
  collectFingerprint: () => void;
}

export const createFingerprintSlice: StateCreator<FingerprintSliceType> = (
  set
) => ({
  fingerprint: null,
  isLoaded: false,
  collectFingerprint: () => {
    if (typeof window === "undefined") return; // Skip during SSR

    const fingerprint: FingerprintData = {
      deviceType: detectDeviceType(),
      osModel: detectOS(),
      browserInfo: detectBrowser(),
      windowInnerResolution: `${window.innerWidth}x${window.innerHeight}`,
      screenOrientation: window.screen.orientation?.type || "unknown",
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory,
      platform: navigator.platform,
      trustScore: calculateTrustScore(),
      timestamp: new Date().toLocaleString(),
    };

    set({ fingerprint, isLoaded: true });
  },
});

// Detection helpers
const detectDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua))
    return "Mobile";
  return "Desktop";
};

const detectOS = (): string => {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os x/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  return "Unknown";
};

const detectBrowser = (): string => {
  const ua = navigator.userAgent;
  if (/edg/i.test(ua)) return "Edge";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/opr\//i.test(ua)) return "Opera";
  if (/chrome|chromium|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Unknown";
};

const calculateTrustScore = (): number => {
  return 117;
};
