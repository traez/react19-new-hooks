import type { StateCreator } from "zustand";

export interface ServerFingerprint {
  network: {
    ip: string;
    as_name?: string;
    as_domain?: string;
    country?: string;
    continent?: string;
  };
  deployment: {
    environment?: string;
  };
  timestamp: string;
}

// Add new VisitorNetwork interface
export interface VisitorNetwork {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  location?: string;
  isp?: string;
  timezone?: string;
}

// Update FingerprintData interface
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
  visitorNetwork?: VisitorNetwork; // Add this
  consentGiven: boolean;
  visitorId?: string;
  visitCount: number;
}

export interface FingerprintSliceType {
  fingerprint: FingerprintData | null;
  isLoaded: boolean;
  error: string | null;
  collectFingerprint: (consent: boolean) => Promise<void>;
}

export const createFingerprintSlice: StateCreator<FingerprintSliceType> = (
  set,
  get
) => ({
  fingerprint: null,
  isLoaded: false,
  error: null,

  collectFingerprint: async (consent) => {
    if (typeof window === "undefined") return;

    try {
      set({ isLoaded: false, error: null });

      const currentState = get();
      const existingFingerprint = currentState.fingerprint;

      // Calculate the new visit count
      const newVisitCount = existingFingerprint
        ? existingFingerprint.visitCount + 1
        : 1;

      const clientFingerprint: Partial<FingerprintData> = {
        deviceType: detectDeviceType(),
        osModel: detectOS(),
        browserInfo: detectBrowser(),
        windowInnerResolution: `${window.innerWidth}x${window.innerHeight}`,
        screenOrientation: window.screen.orientation?.type || "unknown",
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: (navigator as Navigator & { deviceMemory?: number })
          .deviceMemory,
        platform: navigator.platform,
        trustScore: calculateTrustScore(),
        timestamp: new Date().toISOString(),
        consentGiven: consent,
        visitCount: newVisitCount, // Use the incremented count
        visitorId: existingFingerprint?.visitorId, // Preserve existing ID
      };

      // Only generate new visitor ID if we don't have one
      if (!clientFingerprint.visitorId) {
        try {
          const visitorResponse = await fetch("/api/generate-visitor-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fingerprint: clientFingerprint }),
          });

          if (visitorResponse.ok) {
            const visitorData = await visitorResponse.json();
            clientFingerprint.visitorId = visitorData.visitorId;
          }
        } catch (visitorError) {
          console.warn("Failed to generate visitor ID:", visitorError);
        }
      }

      // Fetch server data if consent is given
      let serverData: ServerFingerprint | undefined;
      if (consent) {
        try {
          const response = await fetch("/api/host-network");
          if (response.ok) {
            serverData = await response.json();
          }
        } catch (serverError) {
          console.warn("Failed to fetch Host server fingerprint:", serverError);
        }
      }

      // ADD NEW VISITOR NETWORK FETCH (without altering existing logic)
      let visitorNetwork: VisitorNetwork | undefined;
      if (consent) {
        try {
          const visitorNetworkResponse = await fetch("/api/visitor-network");
          if (visitorNetworkResponse.ok) {
            visitorNetwork = await visitorNetworkResponse.json();
          }
        } catch (visitorNetworkError) {
          console.warn("Failed to fetch visitor network:", visitorNetworkError);
        }
      }

      set({
        fingerprint: {
          ...(clientFingerprint as FingerprintData),
          visitorId: clientFingerprint.visitorId,
          serverData, // existing
          visitorNetwork, // new addition
        },
        isLoaded: true,
      });
    } catch (err) {
      console.error("Fingerprint collection error:", err);
      set({ error: "Failed to collect fingerprint data", isLoaded: true });
    }
  },
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
