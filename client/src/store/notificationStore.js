import { create } from "zustand";

const AUTO_DISMISS_MS = 4000;

let nextId = 1;

export const useNotificationStore = create((set) => ({
  toasts: [],

  push: (message, type = "success") => {
    const id = nextId++;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, AUTO_DISMISS_MS);
  },

  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clear: () => set({ toasts: [] }),
}));

// For non-component code (mutation callbacks, api layer).
export const notify = {
  success: (message) => useNotificationStore.getState().push(message, "success"),
  error: (message) => useNotificationStore.getState().push(message, "error"),
};
