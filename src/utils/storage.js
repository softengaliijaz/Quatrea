// localStorage wrapper that never throws (private mode, quota, disabled storage).
const PREFIX = 'quatrea:';

export const readStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};
