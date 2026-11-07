import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import PerfumeCard from "../../../components/ui/PerfumeCard";
import { Empty, Skeleton } from "../../../components/ui/Loader";
import useDebounce from "../../../hooks/useDebounce";
import { fetchPerfumes } from "../../perfumes/perfumeSlice";
import { SEASONS } from "../../../constants/seasons";

export default function Collection() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.perfumes);
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("seasons");
  const [maxPrice, setMaxPrice] = useState("");
  const q = useDebounce(search);

  useEffect(() => {
    dispatch(
      fetchPerfumes({
        season: season || undefined,
        search: q || undefined,
        sort,
        maxPrice: maxPrice || undefined,
      }),
    );
  }, [dispatch, season, q, sort, maxPrice]);

  return (
    <section className="page container">
      <header className="page-head">
        <h1 className="h1">The collection</h1>
        <p className="muted lead">
          Four seasonal originals anchor a growing collection of scents. Find
          your moment, or follow the year.
        </p>
      </header>

      <div className="filters">
        <div className="chips" role="group" aria-label="Filter by season">
          <button
            className={`chip ${season === "" ? "on" : ""}`}
            onClick={() => setSeason("")}
          >
            All seasons
          </button>
          {SEASONS.map((s) => (
            <button
              key={s.key}
              className={`chip ${season === s.key ? "on" : ""}`}
              style={{ "--c": s.color }}
              onClick={() => setSeason(s.key)}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="filter-inputs">
          <input
            className="input"
            type="search"
            placeholder="Search a name or note"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search perfumes"
          />
          <select
            className="input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            aria-label="Maximum price"
          >
            <option value="">Any price</option>
            <option value="100">Up to $100</option>
            <option value="110">Up to $110</option>
            <option value="120">Up to $120</option>
          </select>
          <select
            className="input"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort"
          >
            <option value="seasons">Order of the year</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="rating">Best rated</option>
          </select>
        </div>
      </div>

      {status === "loading" && !items.length && (
        <div className="grid">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} />
          ))}
        </div>
      )}
      {status === "failed" && (
        <Empty title="We could not load the collection">
          {error}. Check that the server is running and try again.
        </Empty>
      )}
      {status === "succeeded" && !items.length && (
        <Empty title="No fragrance matches">
          Try another season or clear the search.
        </Empty>
      )}
      <motion.div
        className="grid"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {items.map((p) => (
          <motion.div
            key={p._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <PerfumeCard perfume={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
