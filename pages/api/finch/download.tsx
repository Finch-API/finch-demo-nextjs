import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { finchApiUrl, sandboxApiUrl } from '../../../util/constants';
import database from '../../../util/database'

type FinchDirectoryRes = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchEmployee[]
}

export default async function Download(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/download ");

    if (req.method == 'GET') {
        try {
            const token = await database.getConnectionToken()
            const apiUrl = (await database.isSandbox()) ? sandboxApiUrl : finchApiUrl

            const directoryRes = await axios.request<FinchDirectoryRes>({
                method: 'get',
                url: `${apiUrl}/employer/directory`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
            });


            // token successful, return back to location
            return res.status(200).json(directoryRes.data);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error getting employer directory")
        }
    }

    return res.status(405).json("Method not implemented.")
};

function json2csv(json: string) {
    const headers = [
        "Individual ID",
        "Name",
        "Payment Date",
        "Payment Type",
        "Total Hours",
        "Gross Pay",
        "Net Pay",
    ]

    let csvRows = []

    csvRows.push(headers.join(","))



}