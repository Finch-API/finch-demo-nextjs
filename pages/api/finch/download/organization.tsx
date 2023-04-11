import axios, { AxiosError, AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { baseUrl, finchApiUrl, sandboxApiUrl } from '../../../../util/constants';
import database from '../../../../util/database'

type FinchDirectoryRes = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchEmployee[]
}

export default async function DownloadOrganization(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/download/organization ");

    if (req.method == 'GET') {
        try {
            const token = await database.getConnectionToken()
            const apiUrl = (await database.isSandbox()) ? sandboxApiUrl : finchApiUrl

            // Get connection details
            const introspectRes = await axios({
                method: 'get',
                url: `${apiUrl}/introspect`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
            });
            const companyId = introspectRes.data.company_id
            const payrollProviderId = introspectRes.data.payroll_provider_id

            // Get the company directory info
            const directoryRes = await axios.request<FinchDirectoryRes>({
                method: 'get',
                url: `${baseUrl}/api/finch/directory`,
            });


            // Convert the organization data to CSV file
            const csv = json2csv_organization(directoryRes.data.individuals)

            res.setHeader('Content-Type', 'application/csv');
            res.setHeader('Content-Disposition', `attachment; filename=finch-${companyId}-${payrollProviderId}-organization.csv`);
            return res.status(200).send(csv);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error downloading Finch organizational data")
        }
    }

    return res.status(405).json("Method not implemented.")
};

function json2csv_organization(DirectoryJson: FinchEmployee[]) {
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