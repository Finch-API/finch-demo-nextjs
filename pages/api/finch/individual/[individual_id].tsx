import axios from 'axios'
import Redis from 'ioredis'
import { useRouter } from 'next/router';
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO: make this into a react hook
let redis = new Redis(process.env.REDIS_URL ?? '');

type FinchIndividualRes = {
    responses: {
        individual_id: string,
        code: number
        body: FinchIndividual
    }[]
}

export default async function Individual(req: NextApiRequest, res: NextApiResponse) {
    const { individual_id } = req.query;
    console.log(req.method + ` /api/finch/individual/${individual_id}`);

    if (req.method == 'GET') {
        try {
            const token = await redis.get('current_connection');
            const individualRes = await axios.request<FinchIndividualRes>({
                method: 'post',
                url: 'https://api.tryfinch.com/employer/individual',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
                data: {
                    requests: [
                        { individual_id: individual_id }
                    ]
                }
            });

            // Get individual info successful, return back to location
            return res.status(200).json({ data: individualRes.data.responses[0].body });
        } catch (error) {
            //console.error(error);
            return res.status(500).json({ msg: "Error retrieving individual" })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};