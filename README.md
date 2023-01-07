# Finch Demo - Next.js

Description

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

# Your Finch application Client ID for client-side access
NEXT_PUBLIC_FINCH_CLIENT_ID=

# Your Finch Redirect Uri for client-side access
NEXT_PUBLIC_FINCH_REDIRECT_URI=http://localhost:3000/api/finch/callback

# Your Finch application Client ID for server-side access
FINCH_CLIENT_ID=

# Your Finch application Client Secret for server-side access
FINCH_CLIENT_SECRET=
```

### Start Local Application

Start by installing the dependencies of this project:

`npm install` or `yarn install`

Then, run the development server:

`npm run dev` or `yarn dev`

Open [http://localhost:3000]<http://localhost:3000> with your browser to see the result.

You can start editing the page by modifying `components/finch-connect.tsx` or `components/navbar.tsx` or `pages/api/finch`. The pages auto-update as you edit the files.

Finch Data Types can be found in `types/finch.d.ts`.

### Notes

Uses SWR to fetch api requests. A global fetcher function is used which includes a progress bar when loading. Editable in `components/layout.tsx` and `pages/_app.tsx`.

If you want to manually set the `current_connection`, overide the access token located in `./database.json`.

Always try to check for null values when displaying data in a user interface `ex: (employee?.email)`

### Using Gitpod (optional)

The benefits of using Gitpod vs running locally is that this entire application can be built completely in a browser - no additional software dependencies required.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/Finch-API/finch-demo-nextjs)

Copy our example configuration file by running `cp .env.local.example .env.local` in the terminal).

Then, run the development server:

`npm run dev` or `yarn dev`

Open [http://localhost:3000]<http://localhost:3000> with your browser to see the result.
