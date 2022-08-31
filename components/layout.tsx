import Container from './container'
import NavBar from './navbar'
import Footer from './footer'

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
  return (

    <div className='layout'>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
