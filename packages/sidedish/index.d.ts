import type { DetailedHTMLProps, HTMLAttributes, ReactElement, RefObject } from "react";

export type Tone = "good" | "warn" | "bad" | "info" | "ink" | "neutral";
export type Tokens = Partial<Record<"accent" | "bg" | "surface" | "ink" | "sub" | "muted" | "line" | "tint" | "on" | "good" | "warn" | "bad" | "info" | "r" | "font" | "mono", string>>;

export declare function Sidedish(props?: { theme?: Tokens }): ReactElement | null;
export declare function toast(msg: string, opts?: { title?: string; tone?: Tone; duration?: number }): HTMLElement | undefined;
export declare function theme(vars: Tokens, scope?: HTMLElement): void;
export declare function useSidedishEvent<D = any>(ref: RefObject<HTMLElement | null>, name: "select" | "change" | "files" | "sort" | (string & {}), fn: (e: CustomEvent<D>) => void): void;

type El<T = {}> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & T;

declare module "react" {
  // Allow style={{ "--tone": "#7c3aed" }} without casts.
  interface CSSProperties { [key: `--${string}`]: string | number | undefined }
  namespace JSX {
    interface IntrinsicElements {
      "sd-tabs": El<{ selected?: number | string }>;
      "sd-dropdown": El<{ align?: "end" }>;
      "sd-tag-input": El<{ name?: string; value?: string; placeholder?: string }>;
      "sd-table": El<{}>;
      "sd-calendar": El<{ name?: string; value?: string; min?: string; max?: string }>;
      "sd-upload": El<{ name?: string; accept?: string; multiple?: boolean; required?: boolean; label?: string; hint?: string }>;
    }
  }
}
