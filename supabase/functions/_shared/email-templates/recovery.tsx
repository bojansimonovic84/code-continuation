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

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Postavi novu lozinku za {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Zaboravljena lozinka? 🔑</Heading>
          <Text style={text}>
            Primili smo zahtev za promenu lozinke na nalogu {siteName}.
            Klikni na dugme ispod i postavi novu lozinku.
          </Text>
          <Button style={button} href={confirmationUrl}>Postavi novu lozinku</Button>
          <Text style={{ ...text, marginTop: '24px', fontSize: '13px' }}>
            Ako dugme ne radi, kopiraj ovaj link u pretraživač:<br />
            <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
          </Text>
        </Section>
        <Text style={footer}>
          Nisi ti tražio promenu lozinke? Slobodno ignoriši ovaj email — lozinka ostaje ista.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
