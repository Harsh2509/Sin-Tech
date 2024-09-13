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

export class Products {
  products: IProduct[] = [
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
