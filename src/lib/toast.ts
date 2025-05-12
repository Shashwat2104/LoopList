import { toast as sonnerToast, ToastT } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";
type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

interface ToastOptions {
  position?: ToastPosition;
  duration?: number;
  icon?: React.ReactNode;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Display a toast notification
 * @param message The message to display
 * @param type The type of toast (success, error, info, warning)
 * @param options Additional configuration options
 */
export function toast(
  message: string,
  type: ToastType = "info",
  options: ToastOptions = {}
) {
  switch (type) {
    case "success":
      return sonnerToast.success(message, options);
    case "error":
      return sonnerToast.error(message, options);
    case "warning":
      return sonnerToast.warning(message, options);
    case "info":
    default:
      return sonnerToast(message, options);
  }
}

/**
 * Promise toast that shows different messages based on promise resolution
 */
export function promiseToast<T>(
  promise: Promise<T>,
  {
    loading,
    success,
    error,
  }: { loading: string; success: string; error: string },
  options?: ToastOptions
): Promise<T> {
  return sonnerToast.promise(promise, {
    loading,
    success,
    error,
    ...options,
  });
}

/**
 * Dismiss a specific toast by ID or dismiss all if no ID provided
 */
export function dismissToast(toastId?: string | number) {
  if (toastId) {
    sonnerToast.dismiss(toastId);
  } else {
    sonnerToast.dismiss();
  }
}

export default {
  toast,
  promiseToast,
  dismissToast,
};
