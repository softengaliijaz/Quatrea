import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import Bottle from '../common/Bottle';
import QuantityStepper from '../common/QuantityStepper';
import { closeCart } from '../../redux/slices/uiSlice';
import { removeItem, selectCartLines, selectCartSubtotal, setQty } from '../../redux/slices/cartSlice';
import { money } from '../../utils/format';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.cartOpen);
  const lines = useSelector(selectCartLines);
  const subtotal = useSelector(selectCartSubtotal);
  const close = () => dispatch(closeCart());

  useEffect(() => {
    if (!open) return undefined;
    window.__lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => { window.__lenis?.start(); window.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]">
          <motion.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} aria-hidden="true" />
          <motion.aside role="dialog" aria-modal="true" aria-label="Your bag" className="absolute right-0 top-0 flex h-full w-[min(440px,100%)] flex-col bg-bg shadow-soft" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="flex items-center justify-between border-b border-line p-5">
              <h2 className="font-display text-3xl">Your bag</h2>
              <button className="icon-btn" onClick={close} aria-label="Close bag"><X size={22} /></button>
            </div>

            {lines.length === 0 ? (
              <div className="grid flex-1 place-content-center gap-4 p-8 text-center">
                <p className="text-muted">Your bag is empty. Pick a season to begin.</p>
                <Link to="/collection" onClick={close} className="btn mx-auto">Browse the collection</Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto p-5" data-lenis-prevent>
                  {lines.map((l) => (
                    <li key={l.key} className="grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-line py-4">
                      <Bottle color={l.perfume.accent} name={l.perfume.name} height={86} />
                      <div>
                        <h3 className="font-display text-xl">{l.perfume.name}</h3>
                        <p className="mb-2 text-sm text-muted">{l.size} ml · {money(l.unit)}</p>
                        <QuantityStepper value={l.qty} label={`${l.perfume.name} quantity`} onChange={(qty) => dispatch(setQty({ key: l.key, qty }))} />
                      </div>
                      <div className="grid justify-items-end gap-2">
                        <strong>{money(l.unit * l.qty)}</strong>
                        <button className="icon-btn !size-8" onClick={() => dispatch(removeItem(l.key))} aria-label={`Remove ${l.perfume.name}`}><Trash2 size={16} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line p-5">
                  <div className="mb-4 flex justify-between text-lg"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                  <Link to="/cart" onClick={close} className="btn w-full">View bag and check out</Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
