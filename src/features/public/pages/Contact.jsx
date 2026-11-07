import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="page container contact">
      <div>
        <h1 className="h1">Write to the house</h1>
        <p className="lead muted">
          A question about a fragrance, a thought about the house, or simply
          something you would like us to know.
        </p>
        <address className="muted">
          Grasse, France
          <br />
          <a href="mailto:hello@quatrea.com" className="link">
            hello@quatrea.com
          </a>
        </address>
      </div>
      {sent ? (
        <div className="card contact-success" role="status">
          <span aria-hidden="true">✳</span>
          <h2 className="h3">Your note is ready.</h2>
          <p className="muted">This portfolio demo does not send messages to a server. You can open your email app to actually write to the atelier.</p>
          <a className="btn" href="mailto:hello@quatrea.com?subject=A%20note%20for%20Quatr%C3%A9a">Open email</a>
          <button type="button" className="link" onClick={() => setSent(false)}>Write another note</button>
        </div>
      ) : (
        <form className="card form contact-form" onSubmit={handleSubmit}>
          <h2 className="h3">A note, not a form.</h2>
          <p className="muted">Nothing is sent to a website server. We’ll prepare a thank-you here, then let you decide whether to open your email.</p>
          <label className="field"><span>Your name</span><input className="input" name="name" autoComplete="name" required maxLength={100} /></label>
          <label className="field"><span>Email address</span><input className="input" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label className="field"><span>Your note</span><textarea className="input" name="message" rows={5} required minLength={10} maxLength={2000} /></label>
          <button className="btn" type="submit">Prepare my note</button>
        </form>
      )}
    </main>
  );
}
