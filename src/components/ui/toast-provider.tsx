import React from "react";
import { Toaster, ToasterProps } from "sonner";

export interface ToastProviderProps extends Partial<ToasterProps> {
  children: React.ReactNode;
}

/**
 * Toast provider component that should wrap your application
 * to enable toast notifications throughout your app.
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  toastOptions = {},
  theme = "system",
  richColors = true,
  closeButton = true,
  // Enhanced animation settings
  className = "",
  expand = true, // Subtle scale animation when appearing
  duration = 4000, // 4 seconds default duration
  visibleToasts = 3, // Limit visible toasts
  offset = "1.5rem", // Space from edge of screen
  ...props
}: ToastProviderProps) {
  return (
    <>
      <Toaster
        position={position}
        toastOptions={{
          // Default styles and animation settings
          classNames: {
            toast: "group transition-all ease-in-out",
            title: "font-medium text-sm",
            description: "text-sm text-muted-foreground",
            // Enhanced animation and styling
            success:
              "!bg-green-50 !text-green-700 dark:!bg-green-950 dark:!text-green-300",
            error:
              "!bg-red-50 !text-red-700 dark:!bg-red-950 dark:!text-red-300",
            warning:
              "!bg-amber-50 !text-amber-700 dark:!bg-amber-950 dark:!text-amber-300",
            info: "!bg-blue-50 !text-blue-700 dark:!bg-blue-950 dark:!text-blue-300",
            ...toastOptions.classNames,
          },
          ...toastOptions,
        }}
        theme={theme}
        richColors={richColors}
        closeButton={closeButton}
        expand={expand}
        duration={duration}
        visibleToasts={visibleToasts}
        offset={offset}
        className={className}
        {...props}
      />
      {children}
    </>
  );
}

export default ToastProvider;
