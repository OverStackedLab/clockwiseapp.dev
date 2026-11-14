/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID. Defaults to the production ID in src/lib/consent.ts. */
  readonly VITE_GA_ID?: string;
}
