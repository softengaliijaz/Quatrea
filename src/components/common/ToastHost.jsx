import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { dismissToast } from '../../redux/slices/uiSlice';

function Toast({ toast }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 2800);
    return () => clearTimeout(t);
  }, [dispatch, toast.id]);
  return (
    <motion.div layout initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} className="rounded-full bg-ink px-5 py-3 text-sm text-bg shadow-soft">
      {toast.message}
    </motion.div>
  );
}

export default function ToastHost() {
  const toasts = useSelector((s) => s.ui.toasts);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[300] flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
      <AnimatePresence>{toasts.map((t) => <Toast key={t.id} toast={t} />)}</AnimatePresence>
    </div>
  );
}
