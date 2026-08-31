/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import { main, container, header, logoBadge, card, h1, text, code, footer } from './_brand.ts'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="sr" dir="ltr">
    <Head />
    <Preview>Tvoj sigurnosni kod za Poruke.app</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <span style={logoBadge}>Poruke.app</span>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Potvrdi svoj identitet 🔒</Heading>
          <Text style={text}>Unesi ovaj kod u aplikaciji da potvrdiš da si to ti:</Text>
          <Text style={code}>{token}</Text>
          <Text style={{ ...text, marginTop: '8px', fontSize: '13px' }}>
            Kod važi kratko. Nikome ga ne prosleđuj.
          </Text>
        </Section>
        <Text style={footer}>
          Nisi ti tražio ovaj kod? Slobodno ignoriši ovaj email.<br />
          © {new Date().getFullYear()} Poruke.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
