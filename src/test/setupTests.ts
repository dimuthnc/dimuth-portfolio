// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/test/setupTests.ts
import "@testing-library/jest-dom";
import * as React from "react";
import { TextEncoder, TextDecoder } from "util";
import { vi } from "vitest";

// Ensure TextEncoder/TextDecoder come from Node's util to avoid esbuild invariant issue
// Attach to global and window when available
;(globalThis as any).TextEncoder = TextEncoder;
;(globalThis as any).TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

if (typeof window !== "undefined") {
  (window as any).TextEncoder = TextEncoder as any;
  (window as any).TextDecoder = TextDecoder as any;
}

// Mock next/link to a plain anchor for JSDOM
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) =>
    React.createElement("a", { href: typeof href === "string" ? href : "#", ...rest }, children),
}));

// Mock next/image to a plain img for JSDOM
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => React.createElement("img", { ...props, alt: props.alt ?? "" }),
}));

// JSDOM polyfills
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
