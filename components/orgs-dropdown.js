/* 
    This is a common Auth0 Organizations use case. 
    Organizations is meant for Business-2-Business applications, but sometimes customers like to use Organizations as a way to separate “groups/teams/sections” where a single user could be apart of multiple “groups” for a single app. 
    Thus, many customers ask if there is a way to move between organizations for a single user. This isn’t built into the product yet (it is on the roadmap for 4Q2022).
    Historically we tell customer's to call the '/api/users/{user_id}/organizations' endpoint and create a dropdown of the orgs they are members of.
    This is a working example of that functionality.

    1. Log the user in first (so you can get their user_id)
    2. Call the Management API endpoint `/api/users/{user_id}/organizations to get the orgs they are apart of
    3. Displayed the orgs in a dropdown picker
    4. The link for the org when clicked will call the /authorize endpoint to log a user in, but the org_id is passed in as an authorizationParameter like /authorize?organization={org_id} (how this is done can be different for each programming language)
    5. Auth0 will issue a new access token with the current org_id included
*/

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {  ChevronDownIcon } from '@heroicons/react/outline'
import useSWR from 'swr'
import { useProfile } from '../lib/user-profile'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function OrgsDropdown() {
    const { profile } = useProfile()  
    const { data, error } = useSWR('/api/user/organizations', fetcher)
    const [ orgs, setOrgs ] = useState([]);

    useEffect(() => {
      setOrgs(data);
    })

    if (!profile) return ""
    if (!orgs) return "";
    if (error) return "An error has occurred.";

    // Remove the currently signed in organization from the user's list of organizations
    let orgsList = profile.org_id ? orgs.filter( element => element.id !== profile.org_id) : orgs;
    orgsList = Array.from(orgsList);    
    
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="bg-white-800 flex items-center text-sm">
          <span className="sr-only">Open user menu</span>
          { !profile.org_id ? "Login to an organization" : orgs.find(element => element.id == profile.org_id).display_name }
          <ChevronDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {orgsList.map((item) => (
            <Menu.Item>
              {({ active }) => (
                <a
                  key={item.id}
                  // You can specific an organization to login to by passing the organization id as an Authorization Parameter to Auth0
                  href={"/api/auth/login?organization=" + item.id + "&returnTo=" + window.location.pathname}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.display_name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
