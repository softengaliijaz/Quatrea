import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const REVEAL_TARGETS = [
  "main > header",
  "main.center > h1",
  "main.center > p",
  "main.center > a.btn",
  "main > section:not(.story):not(.strip):not(.order-card)",
  ".journal-article-art",
  ".journal-prose > p",
  ".journal-prose blockquote",
  ".wishlist-empty",
  "main > .page-head",
  "main > .container > header",
  "main > .container > section",
  "main > .container > .page-head",
  "main > .container > .filters",
  ".pcard",
  ".journal-entry",
  ".atelier-step",
  ".gift-option",
  ".store-row",
  ".card",
  ".detail-grid",
  ".cart-list > li",
  ".finder-alternate",
];

// Route transition: a colour curtain sweeps across, then the page fades up.
export default function PageTransition({ children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const root = contentRef.current;
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const selector = REVEAL_TARGETS.join(",");
    const observed = new WeakSet();
    const reveal = (targets) => {
      targets.forEach((element, index) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.classList.add("motion-reveal");
        element.style.setProperty("--motion-delay", `${Math.min(index, 7) * 45}ms`);
        if (observer) observer.observe(element);
        else element.classList.add("motion-revealed");
      });
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, currentObserver) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("motion-revealed");
              currentObserver.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
        )
      : null;

    const revealPassed = () => {
      root.querySelectorAll(".motion-reveal:not(.motion-revealed)").forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight * 0.92) return;
        element.classList.add("motion-revealed");
        observer?.unobserve(element);
      });
    };

    window.addEventListener("scroll", revealPassed, { passive: true });
    reveal(root.querySelectorAll(selector));
    revealPassed();
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const matches = node.matches(selector) ? [node] : [];
          reveal([...matches, ...node.querySelectorAll(selector)]);
        });
      });
      revealPassed();
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", revealPassed);
    };
  }, []);

  return (
    <>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        aria-hidden="true"
      />
      <motion.div
        id="content"
        ref={contentRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, duration: 0.5 },
        }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
