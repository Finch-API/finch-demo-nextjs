import axios, { AxiosError, AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { baseUrl, finchApiUrl, sandboxApiUrl } from '../../../util/constants';
import database from '../../../util/database'
import fs from 'fs'

type FinchDirectoryRes = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchEmployee[]
}
type FinchPayStatementsRes = {
    responses: FinchPayStatementRes
}

type FinchPayStatementRes = {
    payment_id: string,
    code: number,
    body: {
        paging: {
            count: number,
            offset: number
        },
        pay_statements: FinchPayStatement[]
    }
}[]

type PayData = {
    payment_id: string,
    pay_date: string,
    pay_statements: FinchPayStatement[]
}[]

export default async function Download(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/download ");
    //const { start_date, end_date } = req.query;
    const start_date = '2023-01-01'
    const end_date = '2023-02-01'


    if (req.method == 'GET') {
        try {
            const token = await database.getConnectionToken()
            const apiUrl = (await database.isSandbox()) ? sandboxApiUrl : finchApiUrl

            const directoryRes = await axios.request<FinchDirectoryRes>({
                method: 'get',
                url: `${baseUrl}/api/finch/directory`,
                // headers: {
                //     Authorization: `Bearer ${token}`,
                //     'Finch-API-Version': '2020-09-17'
                // },
            });

            const paymentRes = await axios.request<FinchPayment[]>({
                method: 'get',
                url: `${baseUrl}/api/finch/payment?start_date=${start_date}&end_date=${end_date}`,
                // headers: {
                //     Authorization: `Bearer ${token}`,
                //     'Finch-API-Version': '2020-09-17'
                // },
            })

            var payData: PayData = [] // we will pass this to the json2csv converter
            var paymentIds: { payment_id: string }[] = [] // we will use these aggregated ids to call the /pay-statement endpoint

            paymentRes.data.forEach(payment => {
                payData.push({
                    payment_id: payment.id,
                    pay_date: payment.pay_date,
                    pay_statements: [] // we will add this later once we call the /pay-statements endpoint
                })
                paymentIds.push({ payment_id: payment.id })
            })

            const payStatementRes = await axios.request<FinchPayStatementsRes>({
                method: 'post',
                url: `${apiUrl}/employer/pay-statement`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
                data: {
                    requests: paymentIds // batched request of all the payment ids between the start_date and end_date
                }
            })

            payStatementRes.data.responses.forEach(response => {
                var payment = payData.find(payment => payment.payment_id === response.payment_id)
                if (payment)
                    payment.pay_statements = response.body.pay_statements // there is a payment_id match, update the pay_statements with the pay_date
            })


            const csv = json2csv(directoryRes.data.individuals, payData)

            res.setHeader('Content-Type', 'application/csv');
            res.setHeader('Content-Disposition', `attachment; filename=sandbox.csv`);
            return res.status(200).send(csv);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error downloading csv file of Finch data")
        }
    }

    return res.status(405).json("Method not implemented.")
};

function json2csv(DirectoryJson: FinchEmployee[], PayDataJson: PayData) {
    const headers = [
        "Individual ID",
        "Name",
        "Payment Date",
        "Payment Type",
        "Total Hours",
        "Gross Pay",
        "Net Pay",
        "Earnings_salary",
        "Earnings_wage",
        "Earnings_1099",
        "Earnings_overtime",
        "Earnings_reimbursement",
        "Earnings_severance",
        "Earnings_double_overtime",
        "Earnings_pto",
        "Earnings_sick",
        "Earnings_bonus",
        "Earnings_commission",
        "Earnings_tips",
        "Earnings_other",
        "Earnings_null",
        "Total Earnings",
        "Total Taxes",
        "Total Deductions",
        "Total Contributions"

    ]

    let rows = []
    rows.push(headers)

    PayDataJson.forEach(payment => {
        const individual_paychecks = payment.pay_statements
        individual_paychecks.forEach(paycheck => {
            const employee = DirectoryJson.find(employee => employee.id === paycheck.individual_id)

            rows.push([
                employee?.id,
                employee?.first_name + ' ' + employee?.last_name,
                payment.pay_date,
                paycheck.type,
                paycheck.total_hours,
                paycheck.gross_pay.amount,
                paycheck.net_pay.amount,
                sumAmountsInType(paycheck.earnings, 'salary'),
                sumAmountsInType(paycheck.earnings, 'wage'),
                sumAmountsInType(paycheck.earnings, '1099'),
                sumAmountsInType(paycheck.earnings, 'overtime'),
                sumAmountsInType(paycheck.earnings, 'reimbursement'),
                sumAmountsInType(paycheck.earnings, 'severance'),
                sumAmountsInType(paycheck.earnings, 'double_overtime'),
                sumAmountsInType(paycheck.earnings, 'pto'),
                sumAmountsInType(paycheck.earnings, 'sick'),
                sumAmountsInType(paycheck.earnings, 'bonus'),
                sumAmountsInType(paycheck.earnings, 'commission'),
                sumAmountsInType(paycheck.earnings, 'tips'),
                sumAmountsInType(paycheck.earnings, 'other'),
                sumAmountsInType(paycheck.earnings, null),
                sumTotal(paycheck.earnings),
                sumTotal(paycheck.taxes),
                sumTotal(paycheck.employee_deductions),
                sumTotal(paycheck.employer_contributions),
            ])
        })
    })

    let csvString = rows.map(row => row.join(',')).join('\n')

    return csvString



}

function sumAmountsInType(array: any[], type: string | null) {
    var total = 0
    array.forEach(element => {
        if (element.type === type)
            total += element.amount
    })
    return total
}

function sumTotal(array: any[]) {
    var total = 0
    array.forEach(element => {
        total += element.amount
    })
    return total
}