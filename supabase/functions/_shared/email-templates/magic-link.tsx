/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { main, container, header, logoBadge, card, h1, text, button, footer, link } from './_brand.ts'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Tvoj link za prijavu na {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Prijavi se jednim klikom ✨</Heading>
          <Text style={text}>
            Klikni na dugme ispod da se uloguješ na <strong>{siteName}</strong>.
            Link važi 60 minuta i može se iskoristiti samo jednom.
          </Text>
          <Button style={button} href={confirmationUrl}>Prijavi se</Button>
          <Text style={{ ...text, marginTop: '24px', fontSize: '13px' }}>
            Ako dugme ne radi:<br />
            <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
          </Text>
        </Section>
        <Text style={footer}>
          Nisi tražio prijavu? Ignoriši ovaj email.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
