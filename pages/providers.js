import useSWR from 'swr'
import { useEffect, useState } from 'react'
import {
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import FinchConnect from '../components/finch-connect'
import { useSession, signIn, signOut } from 'next-auth/react';

const fetcher = (url) => fetch(url).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Providers({ user }) {
  //const { profile, isError, isLoading } = useProfile()
  const { data, error } = useSWR('/api/finch/introspect', fetcher)
  const [providers, setProviders] = useState([]);
  const { data: session } = useSession()

  useEffect(() => {
    //console.log(data);
    setProviders(data);
  }, [data])

  //if (isLoading) return <div>Loading...</div>;
  if (!providers) return "";
  if (error) return <div>{error.message}</div>

  const providersList = Array.from(providers);
  console.log(providersList)

  if (!providers.length == 0) {
    return (
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Finch
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Provider Tokens
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-10">
            <div className="px-4 py-5 sm:px-6 relative">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Read account information associated with an access tokens
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Contains client_id, Finch uuid, array of authorized Finch products, account username used for login, and payroll provider associated with a specific access token.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {providersList.map((item, index) => (
                  <div className={classNames(index % 2 === 0 ? 'bg-gray-50' : 'bg-white', ' px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6')}>
                    <dt className="text-sm font-medium text-gray-500">
                      {item.token}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <pre>{JSON.stringify(item.data, null, 2)}</pre>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Finch
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Provider Tokens
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-10">
            <div className="px-4 py-5 sm:px-6 relative">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Read account information associated with an access tokens
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Contains client_id, Finch uuid, array of authorized Finch products, account username used for login, and payroll provider associated with a specific access token.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className="text-sm font-medium text-gray-500">
                    <div className='flex items-start space-x-4'>
                      <ExclamationCircleIcon className="h-12 w-12 text-rose-700 mr-2" />
                      No providers exist for this organization. Please connect a provider before inspecting tokens.
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <FinchConnect />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
