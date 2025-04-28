// components/EmailTemplate.tsx
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Section } from "@react-email/section";
import { Heading } from "@react-email/heading";

type EmailTemplateProps = {
  firstName: string;
  productName: string;
  productLink: string;
};

export const EmailTemplate = ({
  firstName,
  productName,
  productLink,
}: EmailTemplateProps) => (
  <Html>
    <Container>
      <Section>
        <Heading as="h2">Hi {firstName},</Heading>
        <Text>
          Just a reminder that you added <strong>{productName}</strong> to your
          wishlist.
        </Text>
        <Text>Click below if you still want to check it out:</Text>
        <Button href={productLink}>View Product</Button>
        <Text style={{ marginTop: "20px" }}>
          Have a great day!
          <br />– Wishlisty
        </Text>
      </Section>
    </Container>
  </Html>
);
