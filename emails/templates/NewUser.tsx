import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Button,
  Column,
  Row,
  Link,
} from "@react-email/components";

interface WelcomeEmailProps {
  userName: string;
  shopUrl?: string;
}

const WelcomeEmail = ({
  userName = "Harsh",
  shopUrl = "https://sintechelectronics.shop/products",
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Body
        style={{ backgroundColor: "#f8f9fa", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          <Section>
            <Heading
              style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}
            >
              Welcome to Sin-Tech Electronic, {userName}!
            </Heading>
            <Text style={{ fontSize: "16px", color: "#555" }}>
              Thank you for signing up! We're excited to have you on board.
              Explore a wide range of products, including UPS systems,
              inverters, and batteries designed to meet your needs.
            </Text>
          </Section>
          <Section>
            <Text style={{ fontSize: "16px", color: "#555" }}>
              To get started, visit our store and discover the perfect solutions
              for your power needs.
            </Text>
            <Button
              href={shopUrl}
              style={{
                display: "block",
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "#ffffff",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: "5px",
                margin: "20px 0",
                fontWeight: "bold",
              }}
            >
              Explore the Store
            </Button>
          </Section>
          <Section>
            <Text style={{ fontSize: "14px", color: "#888" }}>
              Need help? Our support team is here for you. Contact us anytime!
            </Text>
          </Section>
        </Container>
        <Container
          style={{
            textAlign: "center",
            padding: "10px",
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          <Text>
            © {new Date().getFullYear()} Sin-Tech Electronic. All rights
            reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
