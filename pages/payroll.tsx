import useSWR from 'swr'
import { useEffect, useState } from 'react'
import MultiRangeSlider from '../components/multi-range-slider';
import { eachDayOfInterval, subYears, addMonths, startOfToday, } from 'date-fns'
import { formatDate, formatCurrency, parseDate } from '../util/format';
import { EyeIcon, CodeIcon } from '@heroicons/react/outline'
import { CodeBlock, nord } from "react-code-blocks";
import { Tab } from '@headlessui/react'

// Setting a static date range to receive the last 3 years of payroll. A month needs to be added (m + 1) since the month is zero-indexed
const dateRange = eachDayOfInterval({
    start: addMonths(subYears(startOfToday(), 3), 1),
    end: startOfToday()
})
const startDateInit = 1
const startDate = formatDate(dateRange[startDateInit - 1])
const endDateInit = dateRange.length + 1
const endDate = formatDate(dateRange[endDateInit - 2])

export default function Payroll() {
    const [startDateNum, setStartDateNum] = useState<number>(startDateInit)
    const [endDateNum, setEndDateNum] = useState<number>(endDateInit)
    const { data, error } = useSWR(`/api/finch/payment?start_date=${startDate}&end_date=${endDate}`, { revalidateOnFocus: false })
    const [payroll, setPayroll] = useState<FinchPayment[]>()
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        //console.log(data)
        setPayroll(data)
    }, [data])

    if (error) return <pre className="mx-auto max-w-5xl p-10">{JSON.stringify(error.message, null, 2)}</pre>
    if (!data || !payroll) return ""
    if (data.code == 501) return data.message

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
                        Finch
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        Payroll
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/b811fdc2542ca-payment" target="_blank">/payment</a> API Endpoint.
                    </p>
                </div>

                <MultiRangeSlider
                    min={1}
                    max={dateRange.length + 1}
                    dateRange={dateRange}
                    onChange={({ min, max }: { min: number, max: number }) => { console.log(`min = ${min}, max = ${max}`); setStartDateNum(min); setEndDateNum(max) }}
                />
                <br />

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
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Payment Id</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pay Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Debit Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gross Pay</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Net Pay</th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">View</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {payroll.filter(payment => {
                                                return payment?.pay_period?.start_date > formatDate(dateRange[startDateNum - 1]) && payment?.pay_period?.end_date < formatDate(dateRange[endDateNum - 2])
                                            }).map((payment, index) => (
                                                <tr className="border-t border-gray-300" key={index}>
                                                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-semibold text-gray-900 sm:pl-6">{payment.id}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.pay_period.start_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.pay_period.end_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.pay_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.debit_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{formatCurrency(payment.gross_pay.amount) + ' ' + payment.gross_pay.currency.toUpperCase()}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{formatCurrency(payment.net_pay.amount) + ' ' + payment.net_pay.currency.toUpperCase()}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a href={`/payment/${payment.id}?start_date=${payment.pay_period.start_date}&end_date=${payment.pay_period.end_date}`} className="text-indigo-600 hover:text-indigo-900">View<span className="sr-only">{payment.id}</span></a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                <CodeBlock
                                    text={JSON.stringify(payroll, null, "\t")}
                                    language='json'
                                    showLineNumbers={true}
                                    theme={nord}
                                />
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