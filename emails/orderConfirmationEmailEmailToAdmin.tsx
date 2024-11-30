"use server";
import { Resend } from "resend";
import OrderConfirmationEmailToAdmin from "./templates/OrderConfirmationEmailToAdmin";
import { IProduct } from "@/lib/products";

const resend = new Resend(process.env.RESEND_API_KEY);

export const orderConfirmationEmailToAdmin = async (
  email: string,
  name: string,
  phone: string,
  address: string,
  products: (IProduct & {
    quantity: number;
  })[]
) => {
  try {
    console.log("Sending Email.!!");
    await resend.emails.send({
      from: "donotreply@sintechelectronics.shop",
      to: email, // This needs to change to admin email ids.. update this later
      subject: "Message for testing",
      react: (
        <OrderConfirmationEmailToAdmin
          user={{ email, name, phone, address }}
          products={products.map((product) => ({
            id: product.id,
            title: product.name,
            quantity: product.quantity,
          }))}
        />
      ),
    });
  } catch (e) {
    return {
      error: e,
    };
  }
};
