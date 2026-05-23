import { toastsAtom } from "./toast-atom";
import { Toast } from "./types";

let id = 0;

export function show(toast: Omit<Toast, "id">) {
  const nextId = `${id++}`;
  toastsAtom.set((toasts) => ({
    ...toasts,
    [nextId]: {
      id: nextId,
      ...toast,
    },
  }));
  return nextId;
}

export function hide(id: Toast["id"]) {
  toastsAtom.set((toasts) => {
    delete toasts[id];
    return {
      ...toasts,
    };
  });
}

export function update(id: Toast["id"], toast: Partial<Toast>) {
  toastsAtom.set((toasts) => {
    let toastToUpdate = toasts[id];
    toastToUpdate = {
      ...toastToUpdate,
      ...toast,
    };

    return {
      ...toasts,
      [id]: toastToUpdate,
    };
  });
}
