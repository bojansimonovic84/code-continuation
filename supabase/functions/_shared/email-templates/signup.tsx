/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import { main, container, header, logoBadge, card, h1, text, button, footer, link } from './_brand.ts'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Potvrdi nalog na {siteName} i kreni sa generisanjem poruka</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Dobrodošao! Potvrdi nalog 🎉</Heading>
          <Text style={text}>
            Hvala što si se registrovao na <Link href={siteUrl} style={link}>{siteName}</Link>.
            Da bismo aktivirali nalog za <strong>{recipient}</strong>, klikni na dugme ispod:
          </Text>
          <Button style={button} href={confirmationUrl}>Potvrdi nalog</Button>
          <Text style={{ ...text, marginTop: '24px', fontSize: '13px' }}>
            Ako dugme ne radi, kopiraj ovaj link u pretraživač:<br />
            <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
          </Text>
        </Section>
        <Text style={footer}>
          Nisi ti pravio nalog? Slobodno ignoriši ovaj email.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
