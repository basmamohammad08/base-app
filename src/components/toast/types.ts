import React from "react";

export type ToastType = "error" | "success" | "warning" | "info" | "disabled";

export type ToastOptions = {
  duration?: number;
  canHide?: boolean;
  leftIcon?: React.ReactNode;
};

export type Toast = {
  id: string;
  title: string;
  type: ToastType;
  options?: ToastOptions;
};
