export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  flavors: string[];
  size: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Vanilla Scoop",
    description: "Rich and creamy vanilla ice cream made with real vanilla beans",
    price: 1,
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop",
    category: "Classic",
    flavors: ["Vanilla"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.5,
    reviews: 124
  },
  {
    id: "2",
    name: "Chocolate Fudge Delight",
    description: "Decadent chocolate ice cream with fudge chunks",
    price: 1,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    category: "Premium",
    flavors: ["Chocolate"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: "3",
    name: "Strawberry Swirl",
    description: "Fresh strawberry ice cream with natural fruit pieces",
    price: 1,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop",
    category: "Fruity",
    flavors: ["Strawberry"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.3,
    reviews: 67
  },
  {
    id: "4",
    name: "Mango Kulfi",
    description: "Traditional Indian kulfi with fresh mango flavor",
    price: 1,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    category: "Indian Special",
    flavors: ["Mango"],
    size: "Kulfi Stick",
    inStock: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: "5",
    name: "Cookies & Cream",
    description: "Vanilla ice cream loaded with chocolate cookie pieces",
    price: 1,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop",
    category: "Premium",
    flavors: ["Cookies & Cream"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "6",
    name: "Pistachio Badam",
    description: "Rich pistachio and almond flavored ice cream",
    price: 1,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=300&fit=crop",
    category: "Premium",
    flavors: ["Pistachio", "Almond"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.7,
    reviews: 43
  },
  {
    id: "7",
    name: "Butterscotch Crunch",
    description: "Smooth butterscotch with crunchy caramel bits",
    price: 1,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
    category: "Classic",
    flavors: ["Butterscotch"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.4,
    reviews: 76
  },
  {
    id: "8",
    name: "Rose Petal Kulfi",
    description: "Delicate rose flavored kulfi with real rose petals",
    price: 1,
    image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&h=300&fit=crop",
    category: "Indian Special",
    flavors: ["Rose"],
    size: "Kulfi Stick",
    inStock: true,
    rating: 4.2,
    reviews: 34
  },
  {
    id: "9",
    name: "Chocolate Chip Mint",
    description: "Refreshing mint ice cream with chocolate chips",
    price: 1,
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop",
    category: "Premium",
    flavors: ["Mint", "Chocolate"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.1,
    reviews: 52
  },
  {
    id: "10",
    name: "Coconut Malai",
    description: "Creamy coconut ice cream with malai texture",
    price: 1,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop",
    category: "Indian Special",
    flavors: ["Coconut"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    id: "11",
    name: "Black Current Sorbet",
    description: "Refreshing black current sorbet, dairy-free option",
    price: 1,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop",
    category: "Sorbet",
    flavors: ["Black Current"],
    size: "Single Scoop",
    inStock: true,
    rating: 4.0,
    reviews: 28
  },
  {
    id: "12",
    name: "Family Pack Assorted",
    description: "500ml pack with 3 different flavors - Vanilla, Chocolate, Strawberry",
    price: 1,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    category: "Family Pack",
    flavors: ["Vanilla", "Chocolate", "Strawberry"],
    size: "500ml Pack",
    inStock: true,
    rating: 4.6,
    reviews: 145
  },
  {
    id: "13",
    name: "Premium Sundae Cup",
    description: "Layered sundae with vanilla ice cream, chocolate sauce, nuts and cherry",
    price: 1,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop",
    category: "Sundae",
    flavors: ["Vanilla", "Chocolate"],
    size: "Sundae Cup",
    inStock: true,
    rating: 4.8,
    reviews: 92
  },
  {
    id: "14",
    name: "Kesar Pista Kulfi",
    description: "Royal saffron and pistachio kulfi with dry fruits",
    price: 1,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    category: "Indian Special",
    flavors: ["Saffron", "Pistachio"],
    size: "Kulfi Stick",
    inStock: true,
    rating: 4.9,
    reviews: 78
  },
  {
    id: "15",
    name: "Chocolate Brownie Blast",
    description: "Chocolate ice cream with brownie chunks and chocolate sauce",
    price: 1,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    category: "Premium",
    flavors: ["Chocolate"],
    size: "Large Scoop",
    inStock: true,
    rating: 4.7,
    reviews: 103
  }
];

export const categories = [
  "All",
  "Classic",
  "Premium", 
  "Indian Special",
  "Fruity",
  "Sorbet",
  "Family Pack",
  "Sundae"
];