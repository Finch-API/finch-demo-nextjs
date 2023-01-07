import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import NProgress from 'nprogress';
import useSWR, { SWRConfig } from 'swr'

async function fetchWithProgress(url: string) {
  NProgress.start()
  const data = await fetch(url).then(async (res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.message = await res.json()
      NProgress.done()
      NProgress.remove()
      throw error
    }
    NProgress.done()
    NProgress.remove()
    return await res.json()
  });



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
