import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Field from "../../../components/ui/Field";
import {
  createPerfume,
  deletePerfume,
  fetchPerfumes,
  updatePerfume,
} from "../../perfumes/perfumeSlice";
import { money } from "../../../utils/makeThunk";

const BLANK = {
  name: "",
  season: "spring",
  tagline: "",
  description: "",
  price: "",
  stock: 20,
  sizeMl: 50,
  accent: "",
  featured: false,
  top: "",
  heart: "",
  base: "",
};
const list = (s) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export default function AdminPerfumes() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.perfumes.items);
  const [form, setForm] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchPerfumes({ limit: 50 }));
  }, [dispatch]);
  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? items.filter((p) =>
          [p.name, p.season, p.tagline].some((value) =>
            value.toLowerCase().includes(query),
          ),
        )
      : items;
  }, [items, search]);
  const set = (k) => (e) =>
    setForm({
      ...form,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const edit = (p) =>
    setForm({
      ...p,
      id: p._id,
      top: p.notes.top.join(", "),
      heart: p.notes.heart.join(", "),
      base: p.notes.base.join(", "),
    });

  const save = async (e) => {
    e.preventDefault();
    const { top, heart, base, id, ...rest } = form;
    const body = {
      name: rest.name,
      season: rest.season,
      tagline: rest.tagline,
      description: rest.description,
      price: Number(rest.price),
      stock: Number(rest.stock),
      sizeMl: Number(rest.sizeMl),
      accent: rest.accent,
      featured: !!rest.featured,
      notes: { top: list(top), heart: list(heart), base: list(base) },
    };
    const res = await dispatch(
      id ? updatePerfume({ id, ...body }) : createPerfume(body),
    );
    if (res.error) return toast.error(res.payload);
    toast.success(id ? "Fragrance updated" : "Fragrance created");
    setForm(null);
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete ${p.name}? This cannot be undone.`)) return;
    const res = await dispatch(deletePerfume(p._id));
    if (res.error) toast.error(res.payload);
    else toast.success("Fragrance deleted");
  };

  return (
    <>
      <div className="bar admin-bar">
        <h2 className="h3">Fragrances</h2>
        <button
          className="btn btn-sm"
          onClick={() =>
            setForm({
              ...BLANK,
              accent: getComputedStyle(document.documentElement)
                .getPropertyValue("--spring")
                .trim(),
            })
          }
        >
          New fragrance
        </button>
      </div>
      <label className="field admin-search">
        <span>Search fragrances</span>
        <input
          className="input"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Name, season, or tagline"
        />
      </label>
      {form && (
        <form onSubmit={save} className="card form admin-form">
          <h3 className="h3">
            {form.id ? `Edit ${form.name}` : "New fragrance"}
          </h3>
          <div className="two">
            <Field
              label="Name"
              required
              value={form.name}
              onChange={set("name")}
            />
            <Field
              label="Season"
              as="select"
              value={form.season}
              onChange={set("season")}
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </Field>
          </div>
          <Field
            label="Tagline"
            required
            value={form.tagline}
            onChange={set("tagline")}
          />
          <Field
            label="Description"
            as="textarea"
            rows="3"
            required
            value={form.description}
            onChange={set("description")}
          />
          <div className="four">
            <Field
              label="Price (USD)"
              type="number"
              min="0"
              required
              value={form.price}
              onChange={set("price")}
            />
            <Field
              label="Stock"
              type="number"
              min="0"
              required
              value={form.stock}
              onChange={set("stock")}
            />
            <Field
              label="Size (ml)"
              type="number"
              min="1"
              value={form.sizeMl}
              onChange={set("sizeMl")}
            />
            <Field
              label="Accent colour"
              type="color"
              value={form.accent}
              onChange={set("accent")}
            />
          </div>
          <div className="two">
            <Field
              label="Top notes (comma separated)"
              value={form.top}
              onChange={set("top")}
            />
            <Field
              label="Heart notes"
              value={form.heart}
              onChange={set("heart")}
            />
          </div>
          <Field label="Base notes" value={form.base} onChange={set("base")} />
          <label className="check">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={set("featured")}
            />{" "}
            Featured on the home page
          </label>
          <div className="row">
            <button className="btn">Save</button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setForm(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Season</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((p) => (
              <tr key={p._id}>
                <td data-label="Name">{p.name}</td>
                <td data-label="Season">{p.season}</td>
                <td data-label="Price">{money(p.price)}</td>
                <td data-label="Stock">{p.stock}</td>
                <td data-label="Rating">{p.ratingAvg || "–"}</td>
                <td className="actions">
                  <button className="link" onClick={() => edit(p)}>
                    Edit
                  </button>
                  <button className="link danger" onClick={() => remove(p)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!visibleItems.length && (
              <tr>
                <td colSpan="6" className="muted">
                  No fragrances match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
