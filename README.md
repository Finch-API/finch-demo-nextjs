# Finch Next.js Demo

Description

## 🚀 Getting Started

### Prerequisites

There are a few things you will need setup on your computer before getting started:

1. Create a Redis Database via Upstash

## How to use

Uses SWR to fetch api requests. A global fetcher function is used which includes a progress bar when loading. Editable in components/layout.tsx.

Finch Data Types can be found in types/finch.d.ts.

### Using Gitpod

The benefits of using Gitpod vs running locally is that this entire workshop can be done completely in a browser - no additional software dependencies required.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/Finch-API/finch-nextjs-demo)

Create a `.env.local` file (or copy our example file `cp .env.local.example .env.local`).

```bash
NEXT_PUBLIC_FINCH_CLIENT_ID=
FINCH_CLIENT_SECRET=
REDIS_URL=
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
