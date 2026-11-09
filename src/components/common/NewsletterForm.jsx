import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/uiSlice';
import { isEmail } from '../../utils/validators';

// Client-only: validates the address and confirms. Nothing is sent anywhere.
export default function NewsletterForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!isEmail(email)) return setError('Enter a valid email address.');
    setError('');
    setDone(true);
    setEmail('');
    dispatch(showToast('Welcome to the house of Quatréa'));
  };

  if (done) return <p className="text-muted">Thank you. Your first letter arrives with the next season.</p>;
  return (
    <form onSubmit={submit} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" aria-invalid={!!error} />
        <button className="btn shrink-0">Subscribe</button>
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </form>
  );
}
