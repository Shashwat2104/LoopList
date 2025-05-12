import { useCallback } from "react";
import { toast, promiseToast, dismissToast } from "@/lib/toast";

/**
 * Hook for using toast notifications throughout the application
 */
export function useToast() {
  const showToast = useCallback(
    (
      message: string,
      type: "success" | "error" | "info" | "warning" = "info",
      options = {}
    ) => {
      return toast(message, type, options);
    },
    []
  );

  const showSuccessToast = useCallback((message: string, options = {}) => {
    return toast(message, "success", options);
  }, []);

  const showErrorToast = useCallback((message: string, options = {}) => {
    return toast(message, "error", options);
  }, []);

  const showInfoToast = useCallback((message: string, options = {}) => {
    return toast(message, "info", options);
  }, []);

  const showWarningToast = useCallback((message: string, options = {}) => {
    return toast(message, "warning", options);
  }, []);

  const showPromiseToast = useCallback(
    <T>(
      promise: Promise<T>,
      messages: { loading: string; success: string; error: string },
      options = {}
    ) => {
      return promiseToast(promise, messages, options);
    },
    []
  );

  const dismiss = useCallback((toastId?: string | number) => {
    dismissToast(toastId);
  }, []);

  return {
    toast: showToast,
    success: showSuccessToast,
    error: showErrorToast,
    info: showInfoToast,
    warning: showWarningToast,
    promise: showPromiseToast,
    dismiss,
  };
}

export default useToast;
