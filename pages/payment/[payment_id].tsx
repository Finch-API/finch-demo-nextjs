import useSWR from 'swr'
import { Fragment, useEffect, useState } from 'react'
import { EyeIcon, CodeIcon } from '@heroicons/react/outline'
import { CodeBlock, nord } from "react-code-blocks";
import { Tab } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { formatCurrency, parseDate } from '../../util/format'

/****************
  NOTE: Right now, this endpoint only handles passing a single pay-statement. 
  Finch has the possibility to batch multiple pay-statements together in a single request, 
  but this sample application does not implement this yet. 
*****************/
export default function Payment() {
  const { payment_id, start_date, end_date } = useRouter().query
  const { data, error } = useSWR(payment_id ? `/api/finch/pay-statement/${payment_id}` : null, { revalidateOnFocus: false })
  const [payments, setPayments] = useState<FinchPayStatement[]>()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailsPayment, setDetailsPayment] = useState<FinchPayStatement>()
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    setPayments(data?.responses[0].body.pay_statements);
  }, [data])

  if (!payment_id || !start_date || !end_date) return "payment_id, start_date, and end_date URL parameters are required.";
  if (error) return <pre className="mx-auto max-w-5xl p-10">{JSON.stringify(error.message, null, 2)}</pre>
  if (!data?.responses || !payments) return "";

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Finch
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Pay Statement
          </p>
          <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/d5fd02c41e83a-pay-statement" target="_blank">/pay-statement</a> API Endpoint.
          </p>
        </div>

        <div className="md:flex md:items-center">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">{parseDate(start_date.toString())} to {parseDate(end_date.toString())}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{payment_id}</p>
          </div>
        </div>

        <div className="flex justify-end px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <Tab.Group>
              <Tab.List className="inline-flex rounded-l rounded-r p-1 text-xs">
                <Tab className={`border-l border-t border-b border-indigo-600 py-2 px-4 rounded-l ${!toggle ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-indigo-600 text-white'}`} onClick={() => setToggle(true)}><EyeIcon className={`inline-flex h-4 w-4 ml-1 mr-2  ${toggle ? 'hover:text-white' : ''}`} /> Preview</Tab>
                <Tab className={`border border-indigo-600 py-2 px-4 rounded-r ${toggle ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-indigo-600 text-white'}`} onClick={() => setToggle(false)}><CodeIcon className={`inline-flex h-4 w-4 ml-1 mr-2 ${toggle ? 'hover:text-white' : ''}`} /> Code</Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        </div>

        {toggle && (
        <div className="">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Individual Id</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Payment Method</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Hours</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">View Individual Pay Data</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {payments.map((payment, index) => (
                        <>
                          <tr className="border-t border-gray-300" key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 text-sm font-semibold text-gray-900 sm:pl-6">
                              <a href={`/employee/${payment.individual_id}`} className="text-indigo-600 hover:text-indigo-900">{payment.individual_id}</a>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{payment?.type}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{payment?.payment_method}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{payment?.total_hours ? payment?.total_hours : 'none'}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a onClick={() => {
                                setDetailsPayment(payment);
                                setDetailsOpen(true);
                              }} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                View Individual Pay Data
                              </a>
                            </td>
                          </tr>
                        </>
                      ))}

                    </tbody>
                  </table>
                  <Transition.Root show={detailsOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setDetailsOpen(false)}>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-80"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-80"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                              as={Fragment}
                              enter="transform transition ease-in-out duration-500 sm:duration-700"
                              enterFrom="translate-x-full"
                              enterTo="translate-x-0"
                              leave="transform transition ease-in-out duration-500 sm:duration-700"
                              leaveFrom="translate-x-0"
                              leaveTo="translate-x-full"
                            >
                              <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                  <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                      <Dialog.Title className="text-lg font-medium text-gray-900">{detailsPayment?.individual_id}</Dialog.Title>
                                      <div className="ml-3 flex h-7 items-center">
                                        <button
                                          type="button"
                                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          onClick={() => setDetailsOpen(false)}
                                        >
                                          <span className="sr-only">Close panel</span>
                                          <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                      </div>
                                    </div>
                                    <Dialog.Description>Pay period: {parseDate(start_date.toString())} to {parseDate(end_date.toString())}</Dialog.Description>
                                  </div>
                                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    <div className="absolute inset-0 px-4 sm:px-6">
                                      <div className="space-y-6 pt-6 pb-5">

                                        <div>
                                          <label htmlFor="gross-pay" className="block text-sm font-medium text-gray-500">
                                            Gross Pay
                                          </label>
                                          <div className="mt-1">
                                            {formatCurrency(detailsPayment?.gross_pay?.amount)} {detailsPayment?.gross_pay?.currency.toLocaleUpperCase()}
                                          </div>
                                        </div>

                                        <div>
                                          <label htmlFor="net-pay" className="block text-sm font-medium text-gray-500">
                                            Net Pay
                                          </label>
                                          <div className="mt-1">
                                            {formatCurrency(detailsPayment?.net_pay?.amount)} {detailsPayment?.net_pay?.currency.toLocaleUpperCase()}
                                          </div>
                                        </div>


                                        <div>
                                          <label htmlFor="earnings" className="block text-sm font-medium text-gray-500">
                                            Earnings
                                          </label>
                                          {detailsPayment?.earnings?.map(earning => (
                                            <div className="mt-1">{formatCurrency(earning?.amount)} {earning?.currency.toLocaleUpperCase()} <span className="mt-1 text-sm text-gray-500"> - {earning?.name} ({earning?.type})</span></div>
                                          ))}
                                        </div>

                                        <div>
                                          <label htmlFor="taxes" className="block text-sm font-medium text-gray-500">
                                            Taxes
                                          </label>
                                          {detailsPayment?.taxes?.map(tax => (
                                            <div className="mt-1">{formatCurrency(tax?.amount)} {tax?.currency.toLocaleUpperCase()} <span className="mt-1 text-sm text-gray-500"> - {tax?.name} ({tax?.type})</span></div>
                                          ))}
                                        </div>


                                        <div>
                                          <label htmlFor="employee_deductions" className="block text-sm font-medium text-gray-500">
                                            Employee Deductions
                                          </label>
                                          {detailsPayment?.employee_deductions?.map(deduction => (
                                            <div className="mt-1">{formatCurrency(deduction?.amount)} {deduction?.currency.toLocaleUpperCase()} <span className="mt-1 text-sm text-gray-500"> - {deduction?.name} ({deduction?.pre_tax ? JSON.stringify(deduction?.pre_tax) : ''})</span></div>
                                          ))}
                                        </div>


                                        <div>
                                          <label htmlFor="employee_contributions" className="block text-sm font-medium text-gray-500">
                                            Employer Contributions
                                          </label>
                                          {detailsPayment?.employer_contributions?.map(contribution => (
                                            <div className="mt-1">{formatCurrency(contribution?.amount)} {contribution?.currency.toLocaleUpperCase()} <span className="mt-1 text-sm text-gray-500"> - {contribution?.name} ({contribution?.type})</span></div>
                                          ))}
                                        </div>



                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        {!toggle && (
          <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div className="overflow-hidden bg-white border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">

                      <CodeBlock
                        text={JSON.stringify(payments, null, "\t")}
                        language='json'
                        showLineNumbers={true}
                        theme={nord}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
