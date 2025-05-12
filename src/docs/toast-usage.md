# Toast Notification System

This project uses a toast notification system based on the Sonner library to display notifications to users. This document explains how to use the toast system in your components.

## Basic Usage

To use toast notifications in your component, import the `useToast` hook:

```tsx
import useToast from "@/hooks/useToast";

function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success("Operation completed successfully!");
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

## Toast Types

The toast system supports multiple types:

- `success`: For successful operations (green)
- `error`: For errors and failures (red)
- `info`: For general information (blue)
- `warning`: For warning messages (yellow/orange)

```tsx
toast.success("Success message");
toast.error("Error message");
toast.info("Info message");
toast.warning("Warning message");
```

## Additional Options

You can customize your toasts with additional options:

```tsx
toast.info("Message", {
  description: "Additional details here",
  duration: 5000, // milliseconds
  position: "top-center",
  action: {
    label: "Undo",
    onClick: () => {
      // Handle undo action
    },
  },
  cancel: {
    label: "Dismiss",
  },
});
```

## Promise Toasts

You can show a loading toast while a promise is pending, then automatically show success or error based on resolution:

```tsx
const fetchData = async () => {
  const promise = fetch("/api/data");

  toast.promise(promise, {
    loading: "Loading data...",
    success: "Data loaded successfully!",
    error: "Failed to load data",
  });

  return promise;
};
```

## Dismissing Toasts

To dismiss toasts programmatically:

```tsx
// Dismiss all toasts
toast.dismiss();

// Dismiss a specific toast by ID
const toastId = toast.info("Message");
toast.dismiss(toastId);
```

## Example Component

See the `src/components/examples/ToastExample.tsx` file for a complete example showing all toast types and options.
