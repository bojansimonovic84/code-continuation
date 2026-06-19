/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import { main, container, header, logoBadge, card, h1, text, code, footer } from './_brand.ts'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Tvoj verifikacioni kod za Poruke.app</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Verifikacioni kod 🔑</Heading>
          <Text style={text}>Unesi ovaj kod da potvrdiš svoj identitet:</Text>
          <div style={{ textAlign: 'center' }}>
            <span style={code}>{token}</span>
          </div>
          <Text style={{ ...text, fontSize: '13px' }}>
            Kod ističe za nekoliko minuta. Ako nisi ti tražio, ignoriši email.
          </Text>
        </Section>
        <Text style={footer}>© {new Date().getFullYear()} Poruke.app</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
