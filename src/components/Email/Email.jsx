import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Heading,
  Hr,
} from "@react-email/components";

export default function OrderEmail({ title, items }) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>{title}</Heading>

          <Hr />

          {items.map(item => (
            <Section key={item.code} style={itemRow}>
              <Img
                src={item.image}
                width="120"
                height="120"
                alt="product"
                style={image}
              />
              <Section>
                <Text><b>Код:</b> {item.code}</Text>
                <Text><b>Розмір:</b> {item.size}</Text>
                <Text><b>Кількість:</b> {item.quantity}</Text>
                <Text><b>Ціна:</b> {item.price} грн</Text>
              </Section>
            </Section>
          ))}
           <Hr />

          <Text style={footer}>
            Очікуйте дзвінка від менеджера для уточнення методу оплати!
          </Text>

          <Hr />

          <Text style={footer}>
            Дякуємо, що обрали <b>avanti.shoes</b> ❤️
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "6px",
};

const heading = {
  fontSize: "20px",
  marginBottom: "20px",
};

const itemRow = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px",
};

const image = {
  borderRadius: "6px",
  objectFit: "cover",
};

const footer = {
  fontSize: "12px",
  color: "#777",
};
