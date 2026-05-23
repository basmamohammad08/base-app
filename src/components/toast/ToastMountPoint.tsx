import * as React from "react";
import { useAtom } from "react-atomic-state";

import { toastsAtom } from "./toast-atom";
import { Toast } from "./Toast";

export function MountPoint() {
  const toasts = useAtom(toastsAtom);

  return (
    <>
      {Object.keys(toasts).map((key) => {
        const toast = toasts[key];
        return (
          <Toast
            key={toast.id}
            title={toast.title}
            type={toast.type}
            duration={toast.options?.duration}
            canHide={toast.options?.canHide}
            leftIcon={toast.options?.leftIcon}
            id={toast.id}
          />
        );
      })}
    </>
  );
}
