export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t text-xl">
      <p className='pr-2'>Powered by</p>
      <a
        className="flex items-center justify-center"
        href="https://tryfinch.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/img/finch-logo.png" alt="Finch Logo" className="h-6" />
      </a>
    </footer>
  )
}
