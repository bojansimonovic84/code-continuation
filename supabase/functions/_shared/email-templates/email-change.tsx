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

interface EmailChangeEmailProps {
  siteName: string
  // oldEmail is the user's current address (HookData.OldEmail). For the
  // NEW-recipient half of a secure email_change fanout, `email` equals the
  // recipient (NEW), so the "from" line must render oldEmail to read
  // "from OLD to NEW" instead of "from NEW to NEW".
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Potvrdi promenu email adrese na {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Potvrdi novu email adresu 📧</Heading>
          <Text style={text}>
            Zatražena je promena email adrese na nalogu {siteName} sa{' '}
            <Link href={`mailto:${oldEmail}`} style={link}>{oldEmail}</Link> na{' '}
            <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
          </Text>
          <Text style={text}>Klikni na dugme ispod da potvrdiš promenu:</Text>
          <Button style={button} href={confirmationUrl}>Potvrdi promenu</Button>
          <Text style={{ ...text, marginTop: '24px', fontSize: '13px' }}>
            Ako dugme ne radi, kopiraj ovaj link u pretraživač:<br />
            <Link href={confirmationUrl} style={link}>{confirmationUrl}</Link>
          </Text>
        </Section>
        <Text style={footer}>
          Nisi ti tražio ovu promenu? Odmah promeni lozinku na svom nalogu.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
