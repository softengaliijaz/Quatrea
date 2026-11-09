import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Field from '../components/common/Field';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { showToast } from '../redux/slices/uiSlice';
import { validateContact } from '../utils/validators';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  useDocumentTitle('Contact');
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validateContact(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    // Frontend-only: nothing is sent anywhere. We simply confirm to the visitor.
    setSent(true);
    setForm(EMPTY);
    dispatch(showToast('Message sent. We reply within two working days.'));
  };

  return (
    <section className="page grid items-start gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <h1 className="t-h1">Write to the house</h1>
        <p className="t-lead mb-6">Questions about a fragrance, an order or a gift? We reply within two working days.</p>
        <address className="not-italic text-muted">Atelier Quatréa<br />12 Rue des Saisons<br />Grasse, France<br /><a href="mailto:hello@quatrea.com" className="link">hello@quatrea.com</a></address>
      </div>
      {sent ? (
        <motion.div className="card grid justify-items-center gap-3 py-14 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="grid size-14 place-items-center rounded-full bg-spring text-[#17161d]"><Check /></span>
          <h2 className="t-h3 !mb-0">Thank you</h2>
          <p className="text-muted">Your message is on its way to the atelier.</p>
          <button className="btn btn-ghost" onClick={() => setSent(false)}>Send another message</button>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="card grid gap-4" noValidate>
          <Field label="Your name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
          <Field label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          <Field label="Subject" value={form.subject} onChange={set('subject')} error={errors.subject} />
          <Field label="Message" as="textarea" rows="5" value={form.message} onChange={set('message')} error={errors.message} />
          <button className="btn">Send message</button>
        </form>
      )}
    </section>
  );
}
