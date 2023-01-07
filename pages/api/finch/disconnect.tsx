import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { disconnect } from 'process'
import database from '../../../util/database'

type disconnectRes = {
    status: string
}

export default async function Disconnect(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/disconnect ");

    if (req.method == 'POST') {
        try {

            const { payroll_provider_id, company_id } = req.body;
            const token = await database.getConnection()

            const disconnectRes = await axios.request<disconnectRes>({
                method: 'POST',
                url: 'https://api.tryfinch.com/disconnect',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
            });

            // Get directory successful, return back to location
            return res.status(200).json(disconnectRes.data);
        } catch (error) {
            //console.error(error);
            return res.status(500).json({ msg: "Error disconnecting access token" })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};