# Finch Demo - Next.js

Integrating Finch with your frontend and backend can be daunting. Managing access tokens, handling null data, knowing which API endpoints to call when, etc. This sample application is meant to help you get started to see how an application can properly implement Finch. Start by running the application locally on your computer and then search through the code for any pages or components that you find interesting.

Since Finch requires having a frontend and a backend (for application security reasons), Next.js is perfect platform since it bundles a React client-side frontend with a server-side backend API running as serverless functions.

## 🚀 Getting Started

### Prerequisites

1. [Register](https://dashboard.tryfinch.com/signup) for a Finch Sandbox Application.
1. Configure the following `Redirect URL` for this application under the "Redirect URIs" section of the "Sandbox" page: `http://localhost:3000/api/finch/callback`
1. Take note of the `Client ID` and `Client Secret`. You'll need these values in the next step. You will need to regenerate the Client Secret the first time before using.

### Basic Setup

Create a `.env.local` file under your root project directory (or copy our example file by running `cp .env.local.example .env.local` in the terminal).

Define the necessary Finch configuration values as follows:

```
# The base url of your application
BASE_URL=http://localhost:3000

# The base url of Finch APIs
FINCH_API_URL=https://api.tryfinch.com
FINCH_SANDBOX_URL=https://sandbox.tryfinch.com/api

# DO NOT CHANGE - Finch Client Id that allows you to enter any provider credentials during demo
NEXT_PUBLIC_FINCH_DEMO_CLIENT_ID=5dc0e9dc-c411-4e4e-a749-0e35aac43080
FINCH_DEMO_CLIENT_ID=5dc0e9dc-c411-4e4e-a749-0e35aac43080

# Your Finch Redirect Uri for client-side access
NEXT_PUBLIC_FINCH_REDIRECT_URI=http://localhost:3000/api/finch/callback

# Your Finch application Client ID for client-side access
NEXT_PUBLIC_FINCH_CLIENT_ID=

# Your Finch application Client ID for server-side access
FINCH_CLIENT_ID=

# Your Finch application Client Secret for server-side access
FINCH_CLIENT_SECRET=
```

### Start Local Application

1. Start by installing the dependencies of this project: `npm install` or `yarn install`.

1. Then, run the development server: `npm run dev` or `yarn dev`.

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Create a new connection by either selecting `Redirect Flow` or `Embed Flow`. Or if you want to skip [Finch Connect](https://developer.tryfinch.com/docs/reference/4a41b0589896f-overview), you can create a `Gusto Sandbox` to start viewing data.

You can start editing the app by modifying `components/finch-connect.tsx` or `components/navbar.tsx` or `pages/api/finch`. The pages auto-update as you edit the files.

You can download the Finch API data as a CSV file by selecting the download icon next to each section. View the code to convert JSON to CSV in `/pages/api/finch/download`.

Finch Data Types can be found in `types/finch.d.ts`.

### Notes

- This app uses `node-json-db` package as a "stand-in" database to make it easy to store access tokens. Replace `/util/database.ts` with your preference of database.

- This app uses `swr` package to fetch API requests. A global fetcher function is used which includes a progress bar when loading. Editable in `components/layout.tsx` and `pages/_app.tsx`.

- If you want to manually set the `current_connection`, overide the access token located in `./database.json` (after running the application locally).

- Always try to check for null values when displaying data in a user interface `ex: (employee?.email)`

### Using Gitpod (optional)

The benefits of using Gitpod vs running locally is that this entire application can be built completely in a browser - no additional machine software dependencies required.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/Finch-API/finch-demo-nextjs)

1. Copy our example configuration file by running `cp .env.local.example .env.local` in the terminal).

1. Then, run the development server: `npm run dev` or `yarn dev`

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
