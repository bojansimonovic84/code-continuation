/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { main, container, header, logoBadge, card, h1, text, button, footer, link } from './_brand.ts'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ siteName, oldEmail, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Potvrdi promenu email adrese za {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Potvrdi novu email adresu ✉️</Heading>
          <Text style={text}>
            Tražio si promenu email adrese na <strong>{siteName}</strong> sa{' '}
            <Link href={`mailto:${oldEmail}`} style={link}>{oldEmail}</Link> na{' '}
            <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
          </Text>
          <Button style={button} href={confirmationUrl}>Potvrdi promenu</Button>
        </Section>
        <Text style={footer}>
          Nisi tražio ovu promenu? Odmah promeni lozinku i kontaktiraj nas.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
