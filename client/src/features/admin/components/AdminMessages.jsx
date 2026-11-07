import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteMessage,
  fetchMessages,
  markMessageRead,
} from "../../contact/contactSlice";
import { dateFmt } from "../../../utils/makeThunk";

export default function AdminMessages() {
  const dispatch = useDispatch();
  const messages = useSelector((s) => s.contact.messages);
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const remove = async (id) => {
    const res = await dispatch(deleteMessage(id));
    if (res.error) toast.error(res.payload);
    else toast.success("Message deleted");
  };

  if (!messages.length) return <p className="muted">No messages yet.</p>;
  return (
    <ul className="order-list">
      {messages.map((m) => (
        <li key={m._id} className={`card ${m.read ? "" : "unread"}`}>
          <div className="order-top">
            <div>
              <strong>{m.subject}</strong>
              <p className="muted small">
                {m.name} ·{" "}
                <a className="link" href={`mailto:${m.email}`}>
                  {m.email}
                </a>{" "}
                · {dateFmt(m.createdAt)}
              </p>
            </div>
            {!m.read && <span className="pill pill-pending">new</span>}
          </div>
          <p>{m.message}</p>
          <div className="row">
            {!m.read && (
              <button
                className="link"
                onClick={() => dispatch(markMessageRead(m._id))}
              >
                Mark as read
              </button>
            )}
            <button className="link danger" onClick={() => remove(m._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
