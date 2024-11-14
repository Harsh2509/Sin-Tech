import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Column,
  Row,
  Link,
} from "@react-email/components";
import { text } from "stream/consumers";

interface props {
  user: {
    email: string;
    name: string;
    phone: string;
  };
  products: {
    id: string;
    title: string;
    quantity: number;
  }[];
}

const OrderConfirmationEmailToAdmin = ({
  user = {
    email: "harsh@gmail.com",
    name: "Harsh",
    phone: "1001",
  },
  products = [
    { id: "1", title: "Product 1", quantity: 4 },
    { id: "2", title: "Product 2", quantity: 2 },
  ],
}: props) => {
  return (
    <Html lang="en">
      <Head>
        <Preview>Order Confirmation Mail For Sin-Tech</Preview>
      </Head>
      <Body>
        <Container>
          <Heading
            style={{
              display: "flex",
              width: "auto",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Order Confirmation Mail
          </Heading>
          <Text style={{ display: "inline-block", textAlign: "center" }}>
            Order has been placed by{" "}
            <span style={styles.userDetails}>{user.name}</span> with email{" "}
            <span
              style={{
                color: "darkblue",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {user.email}
            </span>{" "}
            and phone number{" "}
            <span style={styles.userDetails}>{user.phone}</span>.
          </Text>

          <hr />

          <Text>Products:</Text>

          <Row>
            <Column
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              <Text>Product Title</Text>
            </Column>
            <Column
              style={{
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              <Text>Quantity</Text>
            </Column>
          </Row>

          {products.map((product) => {
            return (
              <Row key={product.id}>
                <Column style={{ width: "50%" }}>
                  <Text>{product.title}</Text>
                </Column>
                <Column style={{ textAlign: "center" }}>
                  <Text>{product.quantity}</Text>
                </Column>
              </Row>
            );
          })}
          <hr />
        </Container>
      </Body>
    </Html>
  );
};
export default OrderConfirmationEmailToAdmin;

const styles = {
  userDetails: { color: "darkblue", fontWeight: "bold" },
};
