"use server";
import { Resend } from "resend";
import OrderConfirmationEmailToAdmin from "./templates/OrderConfirmationEmailToAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPurchaseMailToUser = async (email: string, name: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Message for testing",
      react: (
        <OrderConfirmationEmailToAdmin
          user={{ email, name: "Harsh", phone: "91919191919" }}
          products={[
            { id: "1", title: "Product 1", quantity: 4 },
            { id: "2", title: "Product 2", quantity: 2 },
          ]}
        />
      ),
    });
  } catch (e) {
    return {
      error: e,
    };
  }
};