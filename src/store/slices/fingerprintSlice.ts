// src/store/slices/fingerprintSlice.ts
import type { StateCreator } from "zustand";

// src/store/slices/fingerprintSlice.ts
export interface ServerFingerprint {
    network: {
      ip: string;
      country?: string;
      region?: string;
      city?: string;
    };
    request: {
      method?: string;
      userAgent?: string;
      acceptLanguage?: string;
      referrer?: string;
      host?: string;
    };
    deployment: {
      environment?: string;
    };
    timestamp: string;
  }

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
  serverData?: ServerFingerprint;
  consentGiven: boolean;
}

export interface FingerprintSliceType {
  fingerprint: FingerprintData | null;
  isLoaded: boolean;
  error: string | null;
  collectFingerprint: (consent: boolean) => Promise<void>;
  resetFingerprint: () => void;
}

export const createFingerprintSlice: StateCreator<FingerprintSliceType> = (
  set
) => ({
  fingerprint: null,
  isLoaded: false,
  error: null,
  collectFingerprint: async (consent) => {
    if (typeof window === "undefined") return;

    try {
      set({ isLoaded: false, error: null });

      // Always collect basic client data (non-identifiable)
      const clientFingerprint: Partial<FingerprintData> = {
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
        timestamp: new Date().toISOString(),
        consentGiven: consent,
      };

      // Only collect server data if consent is given
      let serverData: ServerFingerprint | undefined;
      if (consent) {
        const response = await fetch("/api/fingerprint");
        if (!response.ok) throw new Error("Failed to fetch server fingerprint");
        serverData = await response.json();
      }

      set({
        fingerprint: {
          ...(clientFingerprint as FingerprintData),
          serverData,
        },
        isLoaded: true,
      });
    } catch (err) {
      console.error("Fingerprint collection error:", err);
      set({ error: "Failed to collect fingerprint data", isLoaded: true });
    }
  },
  resetFingerprint: () =>
    set({ fingerprint: null, isLoaded: false, error: null }),
});

// Detection helpers (same as before)
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
  // Implement your trust score logic
  return Math.floor(Math.random() * 30) + 70; // Random score between 70-100 for demo
};
