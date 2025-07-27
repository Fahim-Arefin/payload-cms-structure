declare global {
  interface Window {
    botpressWebChat?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      show: () => void;
      hide: () => void;
    };
    botpress?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
    };
  }
}

export {};