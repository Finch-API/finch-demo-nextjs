import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Finch Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-indigo-600" href="https://tryfinch.com">
            Parrot!
          </a>
        </h1>

        <p className="mt-3 text-2xl max-w-xl">
          Get started by editing{' '}
          <code className="rounded-md bg-gray-100 p-2 font-mono text-lg">
            components/finch-connect.tsx
          </code>
          {' '} before adding a new connection.
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="https://developer.tryfinch.com/"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Finch and our API.
            </p>
          </a>

          <a
            href="https://developer.tryfinch.com/docs/reference/00c032eb7c265-quickstart"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Get started &rarr;</h3>
            <p className="mt-4 text-xl">
              Send your first request to Finch's API and dive deeper into how Finch works.
            </p>
          </a>

          <a
            href="https://tryfinch.com/developers/integrations"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Integrations &rarr;</h3>
            <p className="mt-4 text-xl">
              Build one integration and unlock access to 150+ employment systems.
            </p>
          </a>

          <a
            href="https://tryfinch.com/company/security"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Security &rarr;</h3>
            <p className="mt-4 text-xl">
              Finch is committed to protecting the data of our customers.
            </p>
          </a>


        </div>
      </main>
    </div>
  )
}

export default Home
