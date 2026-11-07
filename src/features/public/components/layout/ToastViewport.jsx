import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissToast } from "../../../ui/uiSlice";

export default function ToastViewport() {
  const toast = useSelector((state) => state.ui.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => dispatch(dismissToast()), 3200);
    return () => window.clearTimeout(timer);
  }, [dispatch, toast]);

  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="toast-message" key={toast.id}>
          <span aria-hidden="true">✳</span>
          {toast.message}
          <button
            type="button"
            className="icon-btn"
            aria-label="Dismiss notification"
            onClick={() => dispatch(dismissToast())}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
