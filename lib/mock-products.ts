import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds, IPX8",
    description: "Organic Cotton, fairtrade certified",
    price: 89,
    rating: 5,
    reviewCount: 121,
    image: "/products/IPX8.png",
  },
  {
    id: "2",
    name: "AirPods Max",
    description: "A perfect balance of high-fidelity audio",
    price: 559,
    rating: 4,
    reviewCount: 98,
    image: "/products/airpods.png",
  },
  {
    id: "3",
    name: "Bose BT Earphones",
    description: "Crystal clear audio with deep bass",
    price: 289,
    rating: 3,
    reviewCount: 74,
    image: "/products/bose.png",
  },
  {
    id: "4",
    name: "VIVEFOX Headphones",
    description: "Wired Stereo Headsets With Mic",
    price: 39,
    rating: 4,
    reviewCount: 45,
    image: "/products/vivefox.png",
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling",
    price: 349,
    rating: 5,
    reviewCount: 203,
    image: "/products/sony.png",
  },
  {
    id: "6",
    name: "Jabra Elite 85h",
    description: "SmartSound adaptive technology",
    price: 199,
    rating: 4,
    reviewCount: 87,
    image: "/products/jabra.png",
  },
  {
    id: "7",
    name: "Beats Studio Pro",
    description: "Personalized spatial audio experience",
    price: 349,
    rating: 5,
    reviewCount: 156,
    image: "/products/beats.png",
  },
  {
    id: "8",
    name: "Sennheiser HD 450BT",
    description: "Active noise cancellation, 30h battery",
    price: 129,
    rating: 4,
    reviewCount: 63,
    image: "/products/sennheiser.png",
  },
  {
    id: "9",
    name: "Anker Soundcore Q45",
    description: "Hi-Res Audio, multi-mode ANC",
    price: 59,
    rating: 3,
    reviewCount: 211,
    image: "/products/anker.png",
  },
  {
    id: "10",
    name: "Marshall Monitor II",
    description: "Classic rock-inspired premium sound",
    price: 279,
    rating: 5,
    reviewCount: 48,
    image: "/products/marshall.png",
  },
];

export interface CategoryItem {
  id: string;
  label: string;
  iconName: 'Headphones' | 'Radio' | 'Cable' | 'Disc' | 'Gamepad2' | 'VolumeX' | 'Activity' | 'Mic' | 'Smile' | 'Bluetooth';
}

export const categories: CategoryItem[] = [
  { id: "all",          label: "All",              iconName: "Headphones" },
  { id: "wireless",     label: "Wireless",         iconName: "Radio" },
  { id: "wired",        label: "Wired",            iconName: "Cable" },
  { id: "earbuds",      label: "Earbuds",          iconName: "Disc" },
  { id: "gaming",       label: "Gaming",           iconName: "Gamepad2" },
  { id: "noise-cancel", label: "Noise Cancel",     iconName: "VolumeX" },
  { id: "sports",       label: "Sports",           iconName: "Activity" },
  { id: "studio",       label: "Studio",           iconName: "Mic" },
  { id: "kids",         label: "Kids",             iconName: "Smile" },
  { id: "bluetooth",    label: "Bluetooth",        iconName: "Bluetooth" },
];

