import Container from './container'
import NavBar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <NavBar />
        <main>{children}</main>
      <Footer />
    </div>
  )
}
