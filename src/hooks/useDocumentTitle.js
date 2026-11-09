import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Quatréa` : 'Quatréa — A year, bottled four ways';
  }, [title]);
}
