import React from "react";
import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";

export function ToastExample() {
  const toast = useToast();

  const handleShowSuccessToast = () => {
    toast.success("Operation completed successfully!", {
      description: "Your changes have been saved.",
    });
  };

  const handleShowErrorToast = () => {
    toast.error("Something went wrong!", {
      description: "Please try again later.",
    });
  };

  const handleShowInfoToast = () => {
    toast.info("Did you know?", {
      description: "You can customize these toasts with different options.",
    });
  };

  const handleShowWarningToast = () => {
    toast.warning("Warning!", {
      description: "This action may have consequences.",
    });
  };

  const handlePromiseToast = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly succeed or fail
        Math.random() > 0.5
          ? resolve("Success!")
          : reject(new Error("Failed!"));
      }, 2000);
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Data loaded successfully!",
      error: "Failed to load data",
    });
  };

  const handleCustomToast = () => {
    toast.toast("Custom toast", "info", {
      action: {
        label: "Undo",
        onClick: () => toast.info("Undo clicked!"),
      },
      cancel: {
        label: "Dismiss",
      },
      duration: 5000,
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Toast Examples</h2>
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleShowSuccessToast} variant="default">
          Success Toast
        </Button>
        <Button onClick={handleShowErrorToast} variant="destructive">
          Error Toast
        </Button>
        <Button onClick={handleShowInfoToast} variant="outline">
          Info Toast
        </Button>
        <Button onClick={handleShowWarningToast} variant="secondary">
          Warning Toast
        </Button>
        <Button onClick={handlePromiseToast} variant="default">
          Promise Toast
        </Button>
        <Button onClick={handleCustomToast} variant="outline">
          Custom Toast
        </Button>
      </div>
    </div>
  );
}

export default ToastExample;
