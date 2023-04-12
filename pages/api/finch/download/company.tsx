import axios, { AxiosError, AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { baseUrl, finchApiUrl, sandboxApiUrl } from '../../../../util/constants';
import database from '../../../../util/database'

export default async function DownloadCompany(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/download/company ");

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

            // Get the company details
            const companyRes = await axios.request<FinchCompany>({
                method: 'get',
                url: `${baseUrl}/api/finch/company`,
            });


            // Convert the company data to CSV file
            const csv = json2csv_company(companyRes.data)

            res.setHeader('Content-Type', 'application/csv');
            res.setHeader('Content-Disposition', `attachment; filename=finch-${companyId}-${payrollProviderId}-company.csv`);
            return res.status(200).send(csv);
        } catch (error) {
            console.error(error);
            return res.status(500).redirect("/connection").json("Error downloading Finch company data")
        }
    }

    return res.status(405).json("Method not implemented.")
};

function json2csv_company(CompanyJson: FinchCompany) {
    const companyHeaders = [
        "Company ID",
        "Legal Name",
        "Entity_type",
        "Entity_subtype",
        "EIN",
        "Primary Email",
        "Primary Phone Number",
    ]

    const departmentsHeaders = [
        "Name",
        "Parent",
    ]

    const locationsHeaders = [
        "Line1",
        "Line2",
        "City",
        "State",
        "Postal Code",
        "Country",
    ]

    const accountsHeaders = [
        "Institution Name",
        "Account Name",
        "Account Number",
        "Account Type",
        "Routing Number",
    ]

    let rows = []
    rows.push(companyHeaders)
    rows.push([
        CompanyJson?.id,
        CompanyJson?.legal_name?.replace(',', ' '),
        CompanyJson?.entity.type,
        CompanyJson?.entity.subtype,
        CompanyJson?.ein,
        CompanyJson?.primary_email,
        CompanyJson?.primary_phone_number,
    ])
    rows.push([])
    rows.push(['Departments'])
    rows.push(departmentsHeaders)
    CompanyJson.departments.forEach(dept => {
        rows.push([dept?.name, dept?.parent.name])
    })
    rows.push([])
    rows.push(['Locations'])
    rows.push(locationsHeaders)
    CompanyJson.locations?.forEach(loc => {
        rows.push([
            loc?.line1,
            loc?.line2,
            loc?.city,
            loc?.state,
            loc?.postal_code,
            loc?.country
        ])
    })
    rows.push([])
    rows.push(['Accounts'])
    rows.push(accountsHeaders)
    CompanyJson.accounts?.forEach(acc => {
        rows.push([
            acc?.institution_name,
            acc?.account_name,
            acc?.account_number,
            acc?.account_type,
            acc?.routing_number
        ])
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