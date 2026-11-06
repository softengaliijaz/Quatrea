import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Field from '../components/ui/Field';
import { sendMessage } from '../features/contact/contactSlice';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const dispatch = useDispatch();
  const sending = useSelector((s) => s.contact.sending);
  const [form, setForm] = useState(EMPTY);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendMessage(form));
    if (res.error) return toast.error(res.payload);
    toast.success(res.payload.message);
    setForm(EMPTY);
  };

  return (
    <section className="page container contact">
      <div>
        <h1 className="h1">Write to the house</h1>
        <p className="lead muted">Questions about a fragrance, an order or a gift? We reply within two working days.</p>
        <address className="muted">Atelier Quatréa<br />12 Rue des Saisons<br />Grasse, France<br /><a href="mailto:hello@quatrea.com" className="link">hello@quatrea.com</a></address>
      </div>
      <form onSubmit={submit} className="card form">
        <Field label="Your name" required value={form.name} onChange={set('name')} autoComplete="name" />
        <Field label="Email" type="email" required value={form.email} onChange={set('email')} autoComplete="email" />
        <Field label="Subject" required value={form.subject} onChange={set('subject')} />
        <Field label="Message" as="textarea" rows="5" required minLength="10" maxLength="2000" value={form.message} onChange={set('message')} />
        <button className="btn" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
      </form>
    </section>
  );
}
