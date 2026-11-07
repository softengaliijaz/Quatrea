import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PublicLayout from "./layouts/PublicLayout";
import About from "./features/public/pages/About";
import Cart from "./features/public/pages/Cart";
import Collection from "./features/public/pages/Collection";
import Contact from "./features/public/pages/Contact";
import Home from "./features/public/pages/Home";
import NotFound from "./features/public/pages/NotFound";
import PerfumeDetail from "./features/public/pages/PerfumeDetail";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collection/:slug" element={<PerfumeDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-ink)",
            fontFamily: "var(--font-body)",
          },
        }}
      />
    </>
  );
}
