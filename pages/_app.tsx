import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import NProgress from 'nprogress';
import useSWR, { SWRConfig } from 'swr'

async function fetchWithProgress(url: string) {
  NProgress.start()
  const data = await fetch(url).then((res) => res.json());
  NProgress.done()
  NProgress.remove()
  return data;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SWRConfig value={{
      fetcher: fetchWithProgress
    }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>

  )
}

export default MyApp
