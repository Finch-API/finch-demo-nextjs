import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../util/database'
import { finchApiUrl, sandboxApiUrl } from '../../../util/constants';
import { appendFile } from 'fs';


type disconnectRes = {
    status: string
}

export default async function Disconnect(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/disconnect ");

    if (req.method == 'GET') {
        try {
            const token = await database.getConnectionToken()
            const apiUrl = (await database.isSandbox()) ? sandboxApiUrl : finchApiUrl

            const disconnectRes = await axios.request<disconnectRes>({
                method: 'GET',
                url: `${apiUrl}/disconnect`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
            });

            if (disconnectRes.data.status === "success") {
                console.log("API disconnect successful")
                await database.deleteConnectionToken()
                console.log("Access token deleted from database")
                // Disconnect successful, return back to location
                return res.status(200).json(disconnectRes.data);
            } else {
                console.log("API disconnect unsuccessful")
                return res.status(500).json(disconnectRes.data);
            }





        } catch (error) {
            //console.error(error);
            return res.status(500).json("Error disconnecting access token")
        }
    }

    return res.status(405).json("Method not implemented.")


};