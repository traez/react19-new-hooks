import { createStore } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";
import {
  createFingerprintSlice,
  FingerprintSliceType,
} from "./slices/fingerprintSlice";

export type BoundStoreType = FingerprintSliceType;

export const createBoundStore = () => {
  const store = createStore<BoundStoreType>()(
    persist(
      devtools((set, get, store) => ({
        ...createFingerprintSlice(set, get, store),
      })),
      {
        name: "bound-store",
        partialize: (state) => ({
          fingerprint: state.fingerprint,
        }),
      }
    )
  );

  return store;
};
