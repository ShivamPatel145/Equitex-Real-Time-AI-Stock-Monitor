"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      theme="dark"
      position="top-right"
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster };
