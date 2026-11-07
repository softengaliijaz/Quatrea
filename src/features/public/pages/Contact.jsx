export default function Contact() {
  return (
    <section className="page container contact">
      <div>
        <h1 className="h1">Write to the house</h1>
        <p className="lead muted">
          Questions about a fragrance, an order or a gift? We reply within two
          working days.
        </p>
        <address className="muted">
          Grasse, France
          <br />
          <a href="mailto:hello@quatrea.com" className="link">
            hello@quatrea.com
          </a>
        </address>
      </div>
      <div className="card form">
        <h2 className="h3">A note, not a form</h2>
        <p className="muted">
          For questions about a fragrance or the house, start an email to our
          atelier. Your email app will handle the message; nothing is sent to a
          website server.
        </p>
        <a className="btn" href="mailto:hello@quatrea.com">
          Email the atelier
        </a>
      </div>
    </section>
  );
}
