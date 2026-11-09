import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import { openCart } from '../../redux/slices/uiSlice';
import { selectCartCount } from '../../redux/slices/cartSlice';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/collection', label: 'Collection' },
  { to: '/quiz', label: 'Find your season' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'The house' },
  { to: '/contact', label: 'Contact' },
];

const Badge = ({ n }) => n > 0 && <span className="absolute right-0 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[0.7rem] text-brand-ink">{n}</span>;

const linkClass = ({ isActive }) => `relative py-1 text-[0.95rem] transition-colors hover:text-ink ${isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded after:bg-brand' : 'text-muted'}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, toggle } = useTheme();
  const dispatch = useDispatch();
  const count = useSelector(selectCartCount);
  const wished = useSelector((s) => s.wishlist.ids.length);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-line/60 bg-bg/75 backdrop-blur-xl">
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-[1.7rem] font-semibold" aria-label="Quatréa home">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="9" cy="9" r="7" fill="#86B98F" /><circle cx="17" cy="9" r="7" fill="#F0B13C" fillOpacity=".9" />
            <circle cx="9" cy="17" r="7" fill="#A5495A" fillOpacity=".9" /><circle cx="17" cy="17" r="7" fill="#8FAFD6" fillOpacity=".9" />
          </svg>
          Quatréa
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {LINKS.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>{l.label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-1">
          <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`}>
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wished} saved`}><Heart size={20} /><Badge n={wished} /></Link>
          <button className="icon-btn" onClick={() => dispatch(openCart())} aria-label={`Open bag, ${count} items`}><ShoppingBag size={20} /><Badge n={count} /></button>
          <button className="icon-btn lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden border-t border-line bg-bg lg:hidden" aria-label="Mobile">
            <div className="wrap grid py-2">
              {LINKS.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `border-b border-line py-4 font-display text-2xl ${isActive ? 'text-brand' : ''}`}>{l.label}</NavLink>)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
