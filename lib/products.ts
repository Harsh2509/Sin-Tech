// All the products that are available for purchase in the store like battery, ups, inverter, cables, etc.

type Category = "Battery" | "Ups" | "Inverter" | "Cable" | "Other";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  category: Category;
  image: string;
  alt: string;
  rating: { rate: number; count: number };
}

// This class follows singleton pattern
export class Products {
  private static instance: Products;
  private products: IProduct[];

  private constructor() {
    this.products = [
      {
        id: 1,
        name: "100AH Solar Battery",
        price: 12000,
        shortDescription: "High-capacity 100AH solar UPS battery.",
        description:
          "The 100AH Solar UPS Battery is built to deliver reliable energy storage for solar power systems. With a 100 amp-hour capacity, it ensures continuous power supply during outages, making it a dependable choice for residential or commercial solar installations. Its deep cycle capability maximizes efficiency, allowing it to charge and discharge over multiple cycles without losing performance. Built with advanced technology to withstand fluctuating weather conditions, this battery is ideal for regions prone to cloudy days or inconsistent sunlight. Its compact design and easy integration make it a go-to solution for modern solar setups.",
        category: "Ups",
        image: "/100-ah-solar-ups-battery.jpeg",
        alt: "100AH Solar UPS Battery",
        rating: { rate: 4, count: 10 },
      },
      {
        id: 2,
        name: "Optimuz 65AH Battery",
        price: 10000,
        shortDescription: "Optimuz 12V 65AH backup battery.",
        description:
          "The Optimuz 12V 65AH Battery is designed for efficient backup power storage, delivering a balance between capacity and compactness. With 65 amp-hours of energy, it's perfect for smaller to mid-sized systems where space and performance matter. Ideal for backup or supplementary power sources in both residential and commercial setups, this battery ensures a steady supply of energy during critical times. Built with cutting-edge technology, it offers excellent cycle life and durability, meaning it can reliably perform through many charge and discharge cycles. Its lightweight design allows for flexible installation, making it a versatile solution for power needs.",
        category: "Battery",
        image: "/Optimuz-12v-65ah.jpeg",
        alt: "Optimuz 12Volt 65AH Battery",
        rating: { rate: 5, count: 5 },
      },
      {
        id: 3,
        name: "Optimuz 100AH Battery",
        price: 12000,
        shortDescription: "High-performance Optimuz 100AH battery.",
        description:
          "The Optimuz 12V 100AH Battery is a high-performance power solution designed for users with significant energy storage needs. It delivers excellent performance in both solar energy systems and backup power configurations. With a large 100 amp-hour capacity, this battery ensures long-lasting energy output, suitable for extended use in critical systems like home solar power setups or industrial backup applications. Engineered with durability in mind, it features a robust design capable of withstanding frequent deep cycling, extreme temperatures, and other environmental stresses. Whether used for solar storage or as an emergency backup, it guarantees consistent energy availability.",
        category: "Battery",
        image: "/Optimuz-12v-100ah.jpeg",
        alt: "Optimuz 12Volt 100AH Battery",
        rating: { rate: 4, count: 8 },
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
