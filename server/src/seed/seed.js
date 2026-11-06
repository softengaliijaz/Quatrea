import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Perfume from "../models/Perfume.js";
import Review from "../models/Review.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Message from "../models/Message.js";

const perfumes = [
  {
    name: "Éclosion",
    season: "spring",
    accent: "#86B98F",
    price: 98,
    stock: 40,
    featured: true,
    mood: "First light, open windows",
    tagline: "The first warm morning after the rain.",
    description:
      "Éclosion opens like a window thrown wide. Green tea and pear blossom lift off damp petals, peony and lily of the valley hold the middle, and white musk settles like linen drying in the sun.",
    notes: {
      top: ["Green tea", "Pear blossom"],
      heart: ["Peony", "Lily of the valley"],
      base: ["White musk", "Cedar"],
    },
  },
  {
    name: "Zénith",
    season: "summer",
    accent: "#F0B13C",
    price: 104,
    stock: 35,
    featured: true,
    mood: "Salt air, long afternoons",
    tagline: "Noon on the water, nothing left to do.",
    description:
      "Zénith is bright from the first spray. Bergamot and sea salt meet neroli and frangipani, then dry down into sun-bleached driftwood and a soft vanilla that stays on your skin until evening.",
    notes: {
      top: ["Bergamot", "Sea salt"],
      heart: ["Neroli", "Frangipani"],
      base: ["Driftwood", "Vanilla"],
    },
  },
  {
    name: "Vendange",
    season: "autumn",
    accent: "#8E3B46",
    price: 118,
    stock: 30,
    featured: true,
    mood: "Harvest, candlelight",
    tagline: "Dark fruit, warm wood, the last evening outside.",
    description:
      "Vendange smells like the cellar door opening. Black currant and fig leaf lead into red grape and rose, resting on a deep base of oud and patchouli that grows richer through the evening.",
    notes: {
      top: ["Black currant", "Fig leaf"],
      heart: ["Red grape", "Rose"],
      base: ["Oud", "Patchouli"],
    },
  },
  {
    name: "Givre",
    season: "winter",
    accent: "#8FAFD6",
    price: 112,
    stock: 32,
    featured: true,
    mood: "Still air, first snow",
    tagline: "Cold air, warm skin, a quiet room.",
    description:
      "Givre is crisp and silent. Juniper and pink pepper sparkle over iris and frosted violet, then melt into amber and sandalwood, a warmth that feels like stepping indoors.",
    notes: {
      top: ["Juniper", "Pink pepper"],
      heart: ["Iris", "Frosted violet"],
      base: ["Amber", "Sandalwood"],
    },
  },
];

const run = async () => {
  await connectDB();
  await Promise.all(
    [User, Perfume, Review, Cart, Order, Message].map((m) => m.deleteMany({})),
  );
  const admin = await User.create({
    name: "Quatréa Admin",
    email: "admin@quatrea.com",
    password: "Admin@12345",
    role: "admin",
  });
  const demo = await User.create({
    name: "Demo Customer",
    email: "demo@quatrea.com",
    password: "Demo@12345",
  });
  const created = [];
  for (const p of perfumes) created.push(await Perfume.create(p));
  const samples = [
    [
      created[0],
      5,
      "Fresh without being sharp. I get compliments every time I wear it.",
    ],
    [created[1], 4, "Pure holiday in a bottle. Lasts well into the evening."],
    [
      created[2],
      5,
      "Rich, warm and a little mysterious. My favourite for dinners.",
    ],
    [
      created[3],
      5,
      "Elegant and calm. Smells like walking into a warm room in January.",
    ],
  ];
  for (const [perfume, rating, comment] of samples) {
    await Review.create({
      perfume: perfume._id,
      user: demo._id,
      rating,
      comment,
    });
    await Review.recalculate(perfume._id);
  }
  console.log(
    "Seeded.\n  Admin: admin@quatrea.com / Admin@12345\n  Demo:  demo@quatrea.com / Demo@12345",
  );
  await mongoose.disconnect();
};
run();
