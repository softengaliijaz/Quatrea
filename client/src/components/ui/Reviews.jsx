import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Stars from "./Stars";
import Icon from "./Icon";
import useAuth from "../../hooks/useAuth";
import {
  addReview,
  fetchReviews,
  removeReview,
} from "../../features/reviews/reviewSlice";
import { dateFmt } from "../../utils/makeThunk";

export default function Reviews({ perfumeId }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.reviews);
  const { user, isAdmin } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const mine = items.some((r) => r.user?._id === user?.id);

  useEffect(() => {
    dispatch(fetchReviews(perfumeId));
  }, [dispatch, perfumeId]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(addReview({ perfumeId, rating, comment }));
    if (res.error) return toast.error(res.payload);
    toast.success("Thank you for your review");
    setComment("");
  };

  const remove = async (id) => {
    const res = await dispatch(removeReview(id));
    if (res.error) toast.error(res.payload);
    else toast.success("Review removed");
  };

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h2 className="h2" id="reviews-title">
        Reviews
      </h2>
      {user && !mine && (
        <form onSubmit={submit} className="review-form">
          <div className="rate-pick" role="radiogroup" aria-label="Your rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} stars`}
                onClick={() => setRating(n)}
                className={n <= rating ? "on" : ""}
              >
                <Icon name="star" size={24} fill={n <= rating} />
              </button>
            ))}
          </div>
          <textarea
            className="input"
            rows="3"
            required
            maxLength="800"
            placeholder="How does it wear on you?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-label="Your review"
          />
          <button className="btn btn-sm">Post review</button>
        </form>
      )}
      {!user && (
        <p className="muted">
          <Link to="/login" className="link">
            Sign in
          </Link>{" "}
          to review this fragrance.
        </p>
      )}
      {status === "succeeded" && !items.length && (
        <p className="muted">No reviews yet. Be the first to write one.</p>
      )}
      <ul className="review-list">
        {items.map((r) => (
          <li key={r._id}>
            <div className="review-top">
              <strong>{r.user?.name || "A customer"}</strong>
              <Stars value={r.rating} size={14} />
              <span className="muted small">{dateFmt(r.createdAt)}</span>
            </div>
            <p>{r.comment}</p>
            {(r.user?._id === user?.id || isAdmin) && (
              <button className="link small" onClick={() => remove(r._id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
