//import { useProfile } from '../lib/user-profile'
import Container from '../components/container'
import { useEffect } from 'react'
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  PaperClipIcon
} from '@heroicons/react/outline'
//import { getSession } from '@auth0/nextjs-auth0'
import { useSession, signIn, signOut } from 'next-auth/react';



export default function Profile({user}) {
  const { data:session } = useSession()  

  //if (isLoading) return <div>Loading...</div>;
  //if (isError) return <div>{isError.message}</div>

  if (session) {
    return (
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Next Auth
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              User Profile
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-10">
            <div className="px-4 py-5 sm:px-6 relative">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Core User Profile object
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Contains basic info, such as name, email, and timestamp of the user's latest login, in pre-defined attributes
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {session?.user.email}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {session?.user.name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Organization
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {session?.org_id ? session.org_id : "none"}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Profile Picture
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <img src={session?.user.image} className="w-10 h-10 rounded-full"/>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <Container>
        <a
          href="/api/auth/login"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Login
        </a>
      </Container>
    )
  }
}
