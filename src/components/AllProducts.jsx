// Data.jsx
const products = [
  {
    id: 1,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["920৳"],
    oldPrice: [""],
    image: "/img/pp2.jpg",
    images: ["/img/pp2.jpg", "/img/pp1.jpeg", "/img/pp3.jpeg", "/img/pp4.jpeg"],

    model: {
      phoneName: "iPhone 16 Plus",

      color: "Cream",
    },

    stock: "in-stock",
    features:
      "Made from premium PU leather in a charming cream color, this compact bag features an adjustable strap, spacious interior with inner pocket, and a secure zipper closure—blending elegance with everyday functionality.",
    colors: ["Cream"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5 inch",
      Width: "↔️ 11 inch",
    },

    description: "The perfect blend of elegance and cuteness 🎀🎀",
  },

  {
    id: 2,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["920৳"],
    oldPrice: [""],
    image: "/img/pp5.jpg",
    images: ["/img/pp5.jpg", "/img/pp6.jpeg", "/img/pp7.jpeg"],
    model: {
      color: "Black",
    },
    stock: "in-stock",
    features:
      "Crafted from premium PU leather in a sleek black finish, this stylish bag offers a compact 11x5 inch design with an adjustable strap, inner pocket for essentials, and a secure zipper—perfect for adding a touch of elegance to any look.",
    colors: ["Black"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5 inch",
      Width: "↔️ 11 inch",
    },

    description: "The perfect blend of elegance and cuteness 🎀🎀",
  },

  {
    id: 3,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["920৳"],
    oldPrice: [""],
    image: "/img/pp8.jpg",
    images: ["/img/pp8.jpg", "/img/pp9.jpeg", "/img/pp10.jpeg"],

    model: {
      color: "White",
    },

    stock: "in-stock",
    features:
      "Made from high-quality PU leather in a crisp white shade, this compact 11x5 inch bag features an adjustable strap, secure zipper closure, and an inner pocket—delivering a perfect mix of elegance and everyday charm.",

    colors: ["White"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5 inch",
      Width: "↔️ 11 inch",
    },

    description: "The perfect blend of elegance and cuteness 🎀🎀",
  },

  {
    id: 4,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["950৳"],
    oldPrice: [""],
    image: "/img/pp12.jpg",
    images: ["/img/pp12.jpg", "/img/pp11.jpeg", "/img/pp13.jpeg"],

    model: {
      color: "Light Pink",
    },

    stock: "in-stock",
    features:
      "Made from premium PU leather in a soft light pink shade, this stylish 11.7x5.6 inch bag features a spacious 5-inch inner compartment, adjustable strap, and secure zipper closure—designed to impress and made to adore.",

    colors: ["Light Pink"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5.6 inch",
      Width: "↔️ 11.7 inch",
      InnerSpace: "Spacious of 5 inch",
    },

    description: "Designed to Impress, Made to Adore.",
  },

  {
    id: 5,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["850৳"],
    oldPrice: [""],
    image: "/img/pp14.jpg",
    images: ["/img/pp14.jpg", "/img/pp15.jpeg", "/img/pp16.jpeg"],

    model: {
      color: "Black",
    },

    stock: "in-stock",
    features:
      "Crafted from glossy PU leather, this bold and compact 9.5x5.5 inch bag is effortlessly stylish. It features an adjustable strap, secure zipper closure, and a well-organized interior—perfect for your standout look.",

    colors: ["Black"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5.5 inch",
      Width: "↔️ 9.5 inch",
    },

    description: "Glossy, bold and effortlessly stylish – just like you. ❤️",
  },

  {
    id: 6,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["850৳"],
    oldPrice: [""],
    image: "/img/pp17.jpg",
    images: ["/img/pp17.jpg", "/img/pp18.jpeg", "/img/pp19.jpeg"],
    model: {
      color: "Red",
    },

    stock: "in-stock",
    features:
      "Made from glossy PU leather in a striking red shade, this 9.5x5.5 inch bag features an adjustable strap, secure zipper closure, and a sleek, stylish design that perfectly complements your bold personality.",

    colors: ["Red"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5.5 inch",
      Width: "↔️ 9.5 inch",
    },

    description: "Glossy, bold and effortlessly stylish – just like you. ❤️",
  },

  {
    id: 7,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["850৳"],
    oldPrice: [""],
    image: "/img/pp20.jpg",
    images: [
      "/img/pp20.jpg",
      "/img/pp21.jpeg",
      "/img/pp22.jpeg",
      "/img/pp23.jpeg",
    ],
    model: {
      color: "White",
    },

    stock: "in-stock",
    features:
      "Crafted from durable PU leather in a clean white shade, this 8.7x5.1 inch bag offers a sleek, stylish design with an adjustable strap and secure zipper closure—designed to impress and made to last.",

    colors: ["White"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5.1 inch",
      Width: "↔️ 8.7 inch",
    },

    description: "Designed to impress, made to last ✨",
  },

  {
    id: 8,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["850৳"],
    oldPrice: [""],
    image: "/img/pp24.jpg",
    images: ["/img/pp24.jpg"],
    model: {
      color: "Red",
    },

    stock: "in-stock",
    features:
      "Made from high-quality PU leather in a vibrant red shade, this 11.2x5.1 inch bag can be used as a one-shoulder or hand-held accessory. With ample space for mobile phones, wallets, lipsticks, and keys, it’s designed to complement every look, adding a touch of style and functionality.",

    colors: ["Red"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 5.1 inch",
      Width: "↔️ 11.2 inch",
      Use: "One shoulder/hand held",
      Capacity: "Mobile phones, wallets, lipsticks, keys etc",
    },

    description: "This bag Designed to compliment your every look 🌸🫶💯",
  },

  {
    id: 9,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["850৳"],
    oldPrice: [""],
    image: "/img/pp25.jpg",
    images: ["/img/pp25.jpg"],
    model: {
      color: "Blue",
    },

    stock: "in-stock",
    features:
      "Crafted from durable PU leather in a bold blue shade, this 7.6x6 inch bag is perfect for one-shoulder or hand-held use. With ample space for mobile phones and lipsticks, it’s designed for the woman who knows how to blend style with substance.",

    colors: ["Blue"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 6 inch",
      Width: "↔️ 7.6 inch",
      Use: "One shoulder/hand held",
      Capacity: " Mobile phones, lipsticks etc",
    },

    description:
      "A bag designed for the woman who knows style and substance. 🌸🎀",
  },

  {
    id: 10,
    name: "Shoulder bag",
    brand: "Bag",
    price: ["850৳"],
    oldPrice: [""],
    image: "/img/pp26.jpg",
    images: ["/img/pp26.jpg"],
    model: {
      color: "Green",
    },

    stock: "in-stock",
    features:
      "Made from premium PU leather in a vibrant green shade, this 7.6x6 inch bag offers versatile use as a one-shoulder or hand-held accessory. With space for mobile phones and lipsticks, it’s the perfect blend of style and substance for the woman who knows what she wants.",

    colors: ["Green"],

    specifications: {
      Origin: "China",
      Material: "PU leather",
      Height: " ↕️ 6 inch",
      Width: "↔️ 7.6 inch",
      Use: "One shoulder/hand held",
      Capacity: " Mobile phones, lipsticks etc",
    },

    description:
      "A bag designed for the woman who knows style and substance. 🌸🎀",
  },
];

export default products;
