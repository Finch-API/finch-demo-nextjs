import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, ArrowRightIcon, DownloadIcon } from '@heroicons/react/outline'
import { FinchConnect } from './finch-connect'
import { classNames } from '../util/classnames'
import { baseUrl } from '../util/constants'
import Image from 'next/image'


import gustoLogo from '../public/img/providers/gusto.png'
import bamboohrLogo from '../public/img/providers/bamboohr.png'
import paychexLogo from '../public/img/providers/paychex.png'
import justworksLogo from '../public/img/providers/justworks.png'
import workdayLogo from '../public/img/providers/workday.png'

const navigation = [
  { name: 'Home', href: '/', download: false, current: false },
  { name: 'Company', href: '/company', download: true, downloadLink: "/api/finch/download/company", current: false },
  { name: 'Directory', href: '/directory', download: true, downloadLink: "/api/finch/download/organization", current: false },
  { name: 'Payroll', href: '/payroll', download: true, downloadLink: "/api/finch/download/payroll", current: false },
  { name: 'Deductions', href: '/deductions', download: false, current: false }
]

const finchOptions = {
  embedded: true,
  products: ["company", "directory", "individual", "employment", "payment", "pay_statement", "benefits"],
  redirect_uri: process.env.NEXT_PUBLIC_FINCH_REDIRECT_URI,
  sandbox: true
}

export default function NavBar() {
  const { embeddedFinchConnect, redirectFinchConnect } = FinchConnect()
  const createNewSandbox = async (payroll_provider: string) => {
    const sandbox = await fetch(baseUrl + "/api/finch/sandbox/" + payroll_provider)
    if (sandbox) window.location.assign('/connection');
  }


  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className=" mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/img/bird.png"
                    alt="BirdAuth Logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/img/bird.png"
                    alt="BirdAuth Logo"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div className='flex items-center'>
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600',
                            'pl-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                        {item.download && <a href={item.downloadLink}>
                          <DownloadIcon className="block h-4 w-4 ml-1 mr-2 text-gray-700 hover:text-indigo-600" />
                        </a>}
                      </div>

                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <div className='flex items-center text-sm font-medium text-gray-700'>Create a new connection <ArrowRightIcon className="block h-5 w-5 ml-1 mr-2" /></div>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white-800 flex text-sm rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-offset-blue-600 hover:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/connection"
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Connection
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={redirectFinchConnect}
                            className={classNames(active ? 'bg-gray-100 border-t cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 border-t')}
                          >
                            + Redirect Flow
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => embeddedFinchConnect()}
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            + Embed Flow
                          </a>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => FinchConnect({ sandbox: true }).embeddedFinchConnect()}
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            + Sandbox Flow
                          </a>
                        )}
                      </Menu.Item> */}

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => createNewSandbox("gusto")}
                            className={classNames(active ? 'bg-gray-100 border-t cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 border-t flex items-center')}
                          >
                            <Image src={gustoLogo} width={25} height={25} />
                            <div className="pl-2">Gusto Sandbox</div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => createNewSandbox("bamboo_hr")}
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <Image src={bamboohrLogo} width={25} height={25} />
                            <div className="pl-2">BambooHR Sandbox</div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => createNewSandbox("paychex_flex")}
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <Image src={paychexLogo} width={25} height={25} />
                            <div className="pl-2">Paychex Sandbox</div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => createNewSandbox("justworks")}
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <Image src={justworksLogo} width={25} height={25} />
                            <div className="pl-2">Justworks Sandbox</div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => createNewSandbox("workday")}
                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center')}
                          >
                            <Image src={workdayLogo} width={25} height={25} />
                            <div className="pl-2">Workday Sandbox</div>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
