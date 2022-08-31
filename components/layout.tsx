import Container from './container'
import NavBar from './navbar'
import Footer from './footer'
import NProgress from 'nprogress';
import useSWR, { SWRConfig } from 'swr'


type LayoutProps = {
  children: React.ReactNode,
};


async function fetchWithProgress(url: string) {
  NProgress.start()
  const data = await fetch(url).then((res) => res.json());
  NProgress.done()
  return data;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SWRConfig value={{
      fetcher: fetchWithProgress
    }}>
      <div className='layout'>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  )
}
