import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../features/public/components/layout/Navbar";
import Footer from "../features/public/components/layout/Footer";
import ScrollProgress from "../features/public/components/layout/ScrollProgress";
import PageTransition from "../features/public/components/layout/PageTransition";
import CartDrawer from "../features/public/components/layout/CartDrawer";
import ToastViewport from "../features/public/components/layout/ToastViewport";
import IntroBloom from "../features/public/components/layout/IntroBloom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import useTheme from "../hooks/useTheme";
import { JOURNAL } from "../data/journal";
import { perfumeBySlug } from "../data/perfumes";

const PAGE_METADATA = {
  "/": {
    title: "Quatréa — A year, bottled four ways",
    description:
      "Meet Quatréa: four seasonal fragrances and a considered collection, imagined in Grasse.",
  },
  "/collection": {
    title: "The Collection — Quatréa",
    description:
      "Explore Quatréa's four seasonal fragrances and the wider collection of scents inspired by the changing year.",
  },
  "/discover": {
    title: "Find Your Season — Quatréa",
    description:
      "Answer a few thoughtful questions and discover the Quatréa fragrance that feels like your season.",
  },
  "/quiz": {
    title: "Find Your Season — Quatréa",
    description:
      "Answer a few thoughtful questions and discover the Quatréa fragrance that feels like your season.",
  },
  "/lab": {
    title: "Layering Lab — Quatréa",
    description:
      "Experiment with two Quatréa fragrances and discover a personal scent pairing.",
  },
  "/atlas": {
    title: "Notes Atlas — Quatréa",
    description:
      "Explore the materials, places and impressions behind the Quatréa fragrance collection.",
  },
  "/journal": {
    title: "The Journal — Quatréa",
    description:
      "Field notes on fragrance, wearing, materials and the small rituals of the Quatréa house.",
  },
  "/atelier": {
    title: "The Atelier — Quatréa",
    description:
      "Step into Quatréa's imagined atelier and explore the ideas behind each seasonal fragrance.",
  },
  "/gifts": {
    title: "Gift Finder — Quatréa",
    description:
      "Find a thoughtful Quatréa fragrance gift, guided by the season and the person who will wear it.",
  },
  "/stores": {
    title: "Our Places — Quatréa",
    description:
      "Discover the imagined places and seasonal worlds of the Quatréa perfume house.",
  },
  "/wishlist": {
    title: "Saved Fragrances — Quatréa",
    description:
      "Return to the Quatréa fragrances you have saved for later.",
  },
  "/about": {
    title: "About the House — Quatréa",
    description:
      "The story of Quatréa, a fictional perfume house built around four fragrances and the seasons.",
  },
  "/contact": {
    title: "Contact — Quatréa",
    description:
      "Write a note to the Quatréa house or find the atelier's contact details.",
  },
  "/cart": {
    title: "Your Bag — Quatréa",
    description:
      "Review the fragrances in your Quatréa bag. This portfolio demo does not collect payment.",
  },
  "/checkout": {
    title: "Checkout Preview — Quatréa",
    description:
      "Review a simulated Quatréa order. No payment is collected and no personal information is stored.",
  },
  "/order-confirmed": {
    title: "Order Note — Quatréa",
    description:
      "A confirmation page for the simulated Quatréa checkout experience.",
  },
  "/not-found": {
    title: "Page Not Found — Quatréa",
    description: "The page you requested could not be found at Quatréa.",
  },
};

function metadataForPath(pathname) {
  const perfumeSlug = pathname.match(/^\/collection\/([^/]+)\/?$/)?.[1];
  if (perfumeSlug) {
    const perfume = perfumeBySlug[perfumeSlug];
    return perfume
      ? {
          title: `${perfume.name} — Quatréa`,
          description: `${perfume.tagline} ${perfume.description}`,
        }
      : {
          title: "Fragrance Not Found — Quatréa",
          description: "This fragrance is not part of the Quatréa collection.",
        };
  }

  const articleSlug = pathname.match(/^\/journal\/([^/]+)\/?$/)?.[1];
  if (articleSlug) {
    const article = JOURNAL.find((entry) => entry.slug === articleSlug);
    return article
      ? {
          title: `${article.title} — Quatréa Journal`,
          description: article.dek,
        }
      : {
          title: "Story Not Found — Quatréa Journal",
          description: "This journal story could not be found.",
        };
  }

  return PAGE_METADATA[pathname] || PAGE_METADATA["/not-found"];
}

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export default function PublicLayout() {
  const location = useLocation();
  useSmoothScroll();
  const { mode } = useTheme();

  useEffect(() => {
    const metadata = metadataForPath(location.pathname);
    const description = metadata.description.replace(/\s+/g, " ").trim().slice(0, 180);
    const pageUrl = new URL(location.pathname, window.location.origin).href;
    const socialImage = new URL("/social-card.svg", window.location.origin).href;

    document.title = metadata.title;
    setMeta("name", "description", description);
    setMeta("name", "theme-color", mode === "dark" ? "#121117" : "#f5f4f8");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", "Quatréa, four fragrances shaped by the seasons");
    setMeta("property", "og:site_name", "Quatréa");
    setMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = pageUrl;
  }, [location.pathname, mode]);

  return (
    <>
      <a href="#content" className="skip">
        Skip to content
      </a>
      <ScrollProgress />
      <IntroBloom />
      <Navbar />
      <AnimatePresence
        mode="wait"
        onExitComplete={() =>
          window.__lenis
            ? window.__lenis.scrollTo(0, { immediate: true })
            : window.scrollTo(0, 0)
        }
      >
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <ToastViewport />
    </>
  );
}
