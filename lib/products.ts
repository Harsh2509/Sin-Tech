// All the products that are available for purchase in the store like battery, ups, inverter, cables, etc.

type Category = "Battery" | "Ups" | "Inverter" | "Cable" | "Other";

interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
}

// This class follows singleton pattern
export class Products {
  private static instance: Products;
  private products: IProduct[];

  private constructor() {
    this.products = [
      {
        id: 1,
        name: "100AH Solar UPS Battery",
        price: 12000,
        description: "100AH Solar UPS Battery",
        category: "Ups",
        image: "/100-ah-solar-ups-battery.jpeg",
      },
      {
        id: 2,
        name: "Optimuz 12Volt 65AH Battery",
        price: 10000,
        description: "Optimuz-12v-65ah",
        category: "Battery",
        image: "/Optimuz-12v-65ah.jpeg",
      },
      {
        id: 3,
        name: "Optimuz 12Volt 100AH Battery",
        price: 12000,
        description: "Optimuz-12v-100ah",
        category: "Battery",
        image: "/Optimuz-12v-100ah.jpeg",
      },
    ];
  }

  static getInstance(): Products {
    if (!Products.instance) {
      Products.instance = new Products();
    }
    return Products.instance;
  }

  all(): IProduct[] {
    return this.products;
  }

  find(id: number): IProduct {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }
}
