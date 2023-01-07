import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../util/database'

export default async function Introspect(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/introspect ");

    if (req.method == 'GET') {
        try {
            const token = await database.getConnection()

            const introspectRes = await axios.request<FinchToken>({
                method: 'get',
                url: 'https://api.tryfinch.com/introspect',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                }
            })

            // token introspect successful, return back to location
            return res.status(200).json(introspectRes.data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error inspecting access token" })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })
};