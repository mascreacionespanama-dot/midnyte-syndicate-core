import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import col1 from "@/assets/collection-1.jpg";
import col2 from "@/assets/collection-2.jpg";
import col3 from "@/assets/collection-3.jpg";

export interface Product {
  slug: string;
  name: string;
  price: number;
  collection: string;
  tagline: string;
  description: string;
  details: string[];
  sizes: string[];
  images: string[];
}

export const products: Product[] = [
  {
    slug: "shadow-hoodie",
    name: "Shadow Hoodie",
    price: 280,
    collection: "Night Protocol",
    tagline: "Oversized. Heavy cotton. Disappear into it.",
    description:
      "480gsm heavyweight cotton. Oversized silhouette with dropped shoulders and ribbed cuffs. Embossed Syndicate mark at chest. Built to outlast trends and intention.",
    details: [
      "480gsm heavyweight cotton",
      "Oversized fit — size down if between",
      "Dropped shoulder construction",
      "Embossed Syndicate mark",
      "Matte black hardware",
      "Made in Portugal",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [product1, col1, col2],
  },
  {
    slug: "phantom-cargos",
    name: "Phantom Cargos",
    price: 320,
    collection: "Night Protocol",
    tagline: "Built for the night. Functional. Silent.",
    description:
      "Technical cotton-nylon blend. Six-pocket construction with concealed zip closures. Tapered leg with adjustable hem. Moves with you, carries what matters.",
    details: [
      "Cotton-nylon technical blend",
      "Six pockets, concealed zips",
      "Tapered leg, adjustable hem",
      "Matte black hardware throughout",
      "Syndicate woven label",
      "Made in Portugal",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [product2, col2, col3],
  },
  {
    slug: "void-tee",
    name: "Void Tee",
    price: 140,
    collection: "Night Protocol",
    tagline: "Wear the mark. Say nothing.",
    description:
      "280gsm cotton jersey. Boxy fit with reinforced collar. Tonal Syndicate mark at center chest. The entry point. The statement.",
    details: [
      "280gsm premium cotton jersey",
      "Boxy relaxed fit",
      "Reinforced ribbed collar",
      "Tonal Syndicate chest mark",
      "Back neck woven label",
      "Made in Portugal",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [product3, col1, col3],
  },
  {
    slug: "eclipse-bomber",
    name: "Eclipse Bomber",
    price: 450,
    collection: "Void Chapter",
    tagline: "Silver hardware. Matte shell. Limited.",
    description:
      "Matte nylon shell with satin lining. Silver-tone custom hardware. Ribbed collar, cuffs, and hem. A piece that enters the room before you do. Limited run — no restock.",
    details: [
      "Matte nylon outer shell",
      "Satin interior lining",
      "Silver-tone custom YKK zips",
      "Ribbed collar, cuffs, hem",
      "Interior pocket with zip",
      "Limited production run",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [product4, col2, col1],
  },
  {
    slug: "obsidian-beanie",
    name: "Obsidian Beanie",
    price: 95,
    collection: "Silver Ritual",
    tagline: "Low profile. Deliberate.",
    description:
      "Fine-knit merino wool blend. Tight roll cuff with embroidered Syndicate mark. The finishing detail. Subtle but deliberate.",
    details: [
      "Merino wool blend",
      "Fine-knit construction",
      "Tight roll cuff",
      "Embroidered Syndicate mark",
      "One size fits most",
      "Made in Italy",
    ],
    sizes: ["ONE SIZE"],
    images: [product5, col3, col2],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
