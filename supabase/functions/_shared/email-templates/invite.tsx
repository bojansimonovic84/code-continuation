/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { main, container, header, logoBadge, card, h1, text, button, footer, link } from './_brand.ts'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteName, siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Pozvan si na {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Pozvan si! 💌</Heading>
          <Text style={text}>
            Pozvan si da se pridružiš{' '}
            <Link href={siteUrl} style={link}><strong>{siteName}</strong></Link>.
            Klikni na dugme ispod da prihvatiš poziv i napraviš nalog.
          </Text>
          <Button style={button} href={confirmationUrl}>Prihvati poziv</Button>
        </Section>
        <Text style={footer}>
          Nisi očekivao ovaj poziv? Slobodno ignoriši email.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
