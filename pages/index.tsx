import type { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/navbar'
import { FinchConnect } from '../components/finch-connect'

const Home: NextPage = () => {
  const { embeddedFinchConnect, redirectFinchConnect } = FinchConnect()
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Head>
        <title>Finch Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-20 text-center mt-28 flex-grow">
        <h1 className="text-6xl font-bold">
          Your App{' '}
          <a className="text-indigo-600" href="https://tryfinch.com">
            + Finch
          </a>
        </h1>

        <p className="mt-3 text-2xl max-w-xl">
          Have an admin connect your Payroll Provider or HRIS to our app below
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            onClick={() => embeddedFinchConnect()}
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Embedded Flow &rarr;</h3>
            <p className="mt-4 text-xl">
              Uses a front-end Finch SDK to launch embedded Finch Connect
            </p>
          </a>

          <a
            href={redirectFinchConnect}
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Redirect Flow &rarr;</h3>
            <p className="mt-4 text-xl">
              Generates and redirects to Finch Connect on a Finch-hosted URL
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
