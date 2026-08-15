import { useNotificationStore } from "../store/notificationStore";

const ToastContainer = () => {
  const toasts = useNotificationStore((state) => state.toasts);
  const dismiss = useNotificationStore((state) => state.dismiss);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button
            type="button"
            className="toast-dismiss"
            aria-label="Dismiss notification"
            onClick={() => dismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
