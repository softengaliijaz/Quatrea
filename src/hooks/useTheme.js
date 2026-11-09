import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

export default function useTheme() {
  const mode = useSelector((s) => s.theme.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#121117' : '#f5f4f8');
  }, [mode]);
  return { mode, toggle: () => dispatch(toggleTheme()) };
}
