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
type FinchIndividualRes = {
    responses: {
        individual_id: string,
        code: number,
        body: FinchIndividual
    }[]
}
type FinchEmploymentRes = {
    responses: {
        individual_id: string,
        code: number,
        body: FinchIndividualEmployment
    }[]
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

            const individualIds: { individual_id: string }[] = []
            directoryRes.data.individuals.forEach(ind => {
                individualIds.push({ "individual_id": ind.id })
            })

            // Get all Individual data
            const individualRes = await axios.post<FinchIndividualRes>(`${apiUrl}/employer/individual`, {
                requests: individualIds
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                }
            })

            // Get all Employee data
            const employeeRes = await axios.post<FinchEmploymentRes>(`${apiUrl}/employer/employment`, {
                requests: individualIds
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                }
            })

            // Convert the organization data to CSV file
            const csv = json2csv_organization(directoryRes.data.individuals, individualRes.data, employeeRes.data)

            res.setHeader('Content-Type', 'application/csv');
            res.setHeader('Content-Disposition', `attachment; filename=finch-${companyId}-${payrollProviderId}-organization.csv`);
            return res.status(200).send(csv);
        } catch (error) {
            console.error(error);
            return res.status(500).redirect("/connection").json("Error downloading Finch organizational data")
        }
    }

    return res.status(405).json("Method not implemented.")
};

function json2csv_organization(DirectoryJson: FinchEmployee[], IndividualJson: FinchIndividualRes, EmployeeJson: FinchEmploymentRes) {
    const headers = [
        "Individual ID",
        "Is Active?",
        "First Name",
        "Middle Name",
        "Last Name",
        "Preferred Name",
        "Date Of Birth",
        "SSN",
        "Emails",
        "Phone Numbers",
        "Gender",
        "Ethnicity",
        "Residence Line1",
        "Residence Line2",
        "Residence City",
        "Residence State",
        "Residence Postal Code",
        "Residence Country",
        "Title",
        "Manager ID",
        "Employment Type",
        "Employment Subtype",
        "Department Name",
        "Start Date",
        "End Date",
        "Class Code",
        "Work Location Line1",
        "Work Location Line2",
        "Work Location City",
        "Work Location State",
        "Work Location Postal Code",
        "Work Location Country",
        "Income Amount",
        "Income Currency",
        "Income Unit",
        "Income Effective Date",
        "Income History",
        "Custom Fields",
    ]


    let rows = []
    rows.push(headers)

    DirectoryJson.forEach(dir => {
        const ind = IndividualJson.responses.find(ind => ind.individual_id === dir.id)?.body
        const emp = EmployeeJson.responses.find(emp => emp.individual_id === dir.id)?.body

        rows.push([
            dir.id,
            emp?.is_active,
            ind?.first_name,
            ind?.middle_name,
            ind?.last_name,
            ind?.preferred_name,
            ind?.dob,
            ind?.ssn,
            ind?.emails?.map(email => {
                return `${email?.data} (${email?.type})`
            }).join('; '),
            ind?.phone_numbers?.map(phone => {
                return `${phone?.data} (${phone?.type})`
            }).join('; '),
            ind?.gender,
            ind?.ethnicity,
            ind?.residence?.line1,
            ind?.residence?.line2,
            ind?.residence?.city,
            ind?.residence?.state,
            ind?.residence?.postal_code,
            ind?.residence?.country,
            emp?.title,
            emp?.manager?.id,
            emp?.employment?.type,
            emp?.employment?.subtype,
            emp?.department?.name,
            emp?.start_date,
            emp?.end_date,
            emp?.class_code,
            emp?.location?.line1,
            emp?.location?.line2,
            emp?.location?.city,
            emp?.location?.state,
            emp?.location?.postal_code,
            emp?.location?.country,
            emp?.income?.amount,
            emp?.income?.currency,
            emp?.income?.unit,
            emp?.income?.effective_date,
            emp?.income_history?.map(income => {
                return `${income?.amount} ${income?.currency} ${income.unit} ${income.effective_date}`
            }).join('; '),
            emp?.custom_fields?.map(field => {
                return `name: ${field.name} value: ${field.value}`
            }).join('; ')
        ])
    })

    let csvString = rows.map(row => row.join(',')).join('\n')

    return csvString



}