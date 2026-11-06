import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

export default function useTheme() {
  const mode = useSelector((s) => s.theme.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem("qt-theme", mode);
    } catch {}
  }, [mode]);
  return { mode, toggle: () => dispatch(toggleTheme()) };
}
