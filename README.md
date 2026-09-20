This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form

The contact form is a React Server Action in `src/app/actions/contact.ts`. It
validates on the server, blocks bots with a honeypot field, rate limits by IP,
and sends the message with [Resend](https://resend.com).

### Setup

1. Copy `.env.example` to `.env.local`.
2. Create an API key at <https://resend.com/api-keys> and set `RESEND_API_KEY`.
3. Set `CONTACT_TO_EMAIL` to the inbox that should receive enquiries.

The default sender (`onboarding@resend.dev`) needs no domain verification, but
Resend will only deliver it to the address that owns the account. To send to any
address, verify your own domain and set `CONTACT_FROM_EMAIL` accordingly.

Until a key is set the form still works end to end, but it tells the visitor the
mail service is unavailable and offers a `mailto:` link with their message
pre-filled, so nothing they typed is lost.

### Notes

- Replies go to the visitor: the outgoing mail sets `reply_to` to their address.
- The rate limit is in memory, so it is per instance and resets on cold start.
  Move it to a shared store (Redis, Upstash) if you need a hard guarantee.
- Deploy to a Node runtime. The pages are static, but the Server Action needs a
  server, so a fully static export will not work.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# my-portfolio" 
