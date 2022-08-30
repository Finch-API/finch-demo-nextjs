import axios from 'axios'
import Redis from 'ioredis'
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO: make this into a react hook
let redis = new Redis(process.env.REDIS_URL ?? '');

// TODO: put this into a @types file
type FinchIndividual = {
    id: string,
    first_name: string | null,
    middle_name: string,
    manager: {
        id: string
    },
    department: {
        name: string
    },
    is_active: boolean
}
type FinchDirectory = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchIndividual[]
}

export default async function Directory(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/directory ");

    if (req.method == 'GET') {
        try {
            //const code = req.body;
            const token = await redis.get('current_connection');

            //const tokens = await redis.lrange('user_tokens', 0, -1);

            const directoryRes = await axios.request<FinchDirectory>({
                method: 'get',
                url: 'https://api.tryfinch.com/employer/directory',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
            });

            //console.log(directoryRes)
            //console.log(tokenData);

            // token successful, return back to location
            return res.status(200).json({ data: directoryRes.data, msg: "Success" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error retrieving company directory" })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};