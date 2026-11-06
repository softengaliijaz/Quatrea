import { useSelector } from 'react-redux';

export default function useAuth() {
  const { user, initialized, status, error } = useSelector((s) => s.auth);
  return { user, initialized, status, error, isAuthed: !!user, isAdmin: user?.role === 'admin' };
}
