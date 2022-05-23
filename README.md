# Finch Next.js Demo

Description

## 🚀 Getting Started

### Prerequisites

There are a few things you will need setup on your computer before getting started:
1.
2.

## How to use

### Using Gitpod

The benefits of using Gitpod vs running locally is that this entire workshop can be done completely in a browser - no additional software dependencies required.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/Finch-API/finch-nextjs-demo)

Create a `.env.local` file (or copy our example file `cp .env.local.example .env.local`).

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET='Run `$ openssl rand -base64 32` in your terminal to generate a secret'

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

DATABASE_URL=sqlite://localhost/:memory:?synchronize=true
```

### Using local machine

Using Gitpod is ideal, but if you want to run this reference implementation locally, there are a few things you will need setup on your computer before getting started:

[TODO]

To run your site locally, use:

```bash
npm run dev
```

To run it in production mode, use:

```bash
npm run build
npm run start
```
