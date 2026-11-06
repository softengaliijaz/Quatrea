import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Perfume from "../models/Perfume.js";
import Review from "../models/Review.js";
import slugify from "../utils/slugify.js";

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
  {
    name: "Matin Clair",
    season: "spring",
    accent: "#A6C7A5",
    price: 92,
    stock: 28,
    featured: false,
    mood: "A garden just after sunrise",
    tagline: "Soft petals in the first light.",
    description:
      "A gentle green opening of mandarin leaf and crushed stems gives way to magnolia and freesia, grounded by pale woods and clean musk.",
    notes: {
      top: ["Mandarin leaf", "Green stems"],
      heart: ["Magnolia", "Freesia"],
      base: ["Pale woods", "Clean musk"],
    },
  },
  {
    name: "Rosée",
    season: "spring",
    accent: "#D7A7B2",
    price: 96,
    stock: 24,
    featured: false,
    mood: "Petals with morning dew",
    tagline: "A quiet blush of rose and pear.",
    description:
      "Juicy pear and pink pepper brighten a heart of rosewater and violet leaf, settling close to the skin with soft cashmere woods.",
    notes: {
      top: ["Pear", "Pink pepper"],
      heart: ["Rosewater", "Violet leaf"],
      base: ["Cashmere woods", "Musk"],
    },
  },
  {
    name: "Soleil d'Or",
    season: "summer",
    accent: "#E8B856",
    price: 108,
    stock: 22,
    featured: false,
    mood: "Golden hour on warm skin",
    tagline: "Sun-warmed citrus with a honeyed finish.",
    description:
      "Bitter orange and mandarin sparkle over jasmine sambac and golden osmanthus, finishing in smooth benzoin and sunlit cedar.",
    notes: {
      top: ["Bitter orange", "Mandarin"],
      heart: ["Jasmine sambac", "Osmanthus"],
      base: ["Benzoin", "Cedar"],
    },
  },
  {
    name: "Brise Marine",
    season: "summer",
    accent: "#72B9C1",
    price: 102,
    stock: 26,
    featured: false,
    mood: "A cool breeze along the coast",
    tagline: "A fresh salt breeze, softened by white flowers.",
    description:
      "Lime zest and marine air drift into transparent jasmine and sage, while mineral woods leave a clean, lingering trail.",
    notes: {
      top: ["Lime zest", "Marine air"],
      heart: ["Jasmine", "Sage"],
      base: ["Mineral woods", "White musk"],
    },
  },
  {
    name: "Bois Ambré",
    season: "autumn",
    accent: "#B46D4E",
    price: 124,
    stock: 18,
    featured: false,
    mood: "Amber light through the leaves",
    tagline: "A glowing embrace of spice and woods.",
    description:
      "Cardamom and bitter orange open into iris and toasted tonka, wrapped in amber resin and a deep, polished sandalwood.",
    notes: {
      top: ["Cardamom", "Bitter orange"],
      heart: ["Iris", "Toasted tonka"],
      base: ["Amber resin", "Sandalwood"],
    },
  },
  {
    name: "Nuit de Figue",
    season: "autumn",
    accent: "#77605F",
    price: 116,
    stock: 20,
    featured: false,
    mood: "Fig and velvet after dusk",
    tagline: "Ripe fig, dark tea, and a little mystery.",
    description:
      "Black tea and ripe fig create a deep, textured opening, softened by violet and wrapped in smoky vetiver and tonka bean.",
    notes: {
      top: ["Black tea", "Fig"],
      heart: ["Violet", "Cacao"],
      base: ["Vetiver", "Tonka bean"],
    },
  },
  {
    name: "Neige Blanche",
    season: "winter",
    accent: "#B7C7D9",
    price: 110,
    stock: 21,
    featured: false,
    mood: "Fresh snow in a quiet forest",
    tagline: "Cool air, soft powder, warm woods.",
    description:
      "A crisp aldehydic opening melts into powdery heliotrope and white cedar, with a cashmere musk warmth beneath the winter air.",
    notes: {
      top: ["Aldehydes", "Bergamot"],
      heart: ["Heliotrope", "White cedar"],
      base: ["Cashmere musk", "Amber"],
    },
  },
  {
    name: "Feu de Bois",
    season: "winter",
    accent: "#9B786A",
    price: 128,
    stock: 16,
    featured: false,
    mood: "A firelit room on a cold night",
    tagline: "Smouldering woods, made soft and close.",
    description:
      "Pink pepper and clove glow over incense and black vanilla, settling into smoky birch and an enveloping amber accord.",
    notes: {
      top: ["Pink pepper", "Clove"],
      heart: ["Incense", "Black vanilla"],
      base: ["Smoky birch", "Amber"],
    },
  },
];

const run = async () => {
  await connectDB();
  let admin = await User.findOne({ email: "admin@quatrea.com" });
  if (!admin) {
    admin = await User.create({
      name: "Quatréa Admin",
      email: "admin@quatrea.com",
      password: "Admin@12345",
      role: "admin",
    });
  }
  let demo = await User.findOne({ email: "demo@quatrea.com" });
  if (!demo) {
    demo = await User.create({
      name: "Demo Customer",
      email: "demo@quatrea.com",
      password: "Demo@12345",
    });
  }
  const created = [];
  for (const p of perfumes) {
    const slug = slugify(p.name);
    await Perfume.updateOne(
      { name: p.name },
      { $setOnInsert: { ...p, slug } },
      { upsert: true, setDefaultsOnInsert: true },
    );
    created.push(await Perfume.findOne({ name: p.name }));
  }
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
    const existing = await Review.exists({
      perfume: perfume._id,
      user: demo._id,
    });
    if (!existing) {
      await Review.create({
        perfume: perfume._id,
        user: demo._id,
        rating,
        comment,
      });
      await Review.recalculate(perfume._id);
    }
  }
  console.log(`Seeded ${created.length} perfumes without deleting existing data.`);
  await mongoose.disconnect();
};
run();
