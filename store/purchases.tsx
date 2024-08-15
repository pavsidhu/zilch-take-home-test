import { subHours } from "date-fns";
import { atom } from "jotai";

export type Purchase = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
};

export const purchasesAtom = atom<Purchase[]>([
  {
    id: "1",
    name: "Uber",
    price: 16.99,
    createdAt: subHours(new Date(), 12),
  },
  {
    id: "2",
    name: "Amazon UK",
    price: 56.0,
    createdAt: subHours(new Date(), 24),
  },
  {
    id: "3",
    name: "ASOS",
    price: 24.0,
    createdAt: subHours(new Date(), 48),
  },
  {
    id: "4",
    name: "Greggs",
    price: 2.49,
    createdAt: subHours(new Date(), 112),
  },
  {
    id: "5",
    name: "Christopher Rose Lee Anderson",
    price: 15.1,
    createdAt: subHours(new Date(), 113),
  },
  {
    id: "6",
    name: "Tesco",
    price: 228.4,
    createdAt: subHours(new Date(), 128),
  },
  {
    id: "7",
    name: "BrewDog",
    price: 12.0,
    createdAt: subHours(new Date(), 143),
  },
  {
    id: "8",
    name: "Asda",
    price: 48.2,
    createdAt: subHours(new Date(), 183),
  },
  {
    id: "9",
    name: "H&M",
    price: 41.3,
    createdAt: subHours(new Date(), 184),
  },
  {
    id: "10",
    name: "Zara",
    price: 135.1,
    createdAt: subHours(new Date(), 201),
  },
]);
