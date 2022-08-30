import axios from 'axios'
import Redis from 'ioredis'
import { useRouter } from 'next/router';
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO: make this into a react hook
let redis = new Redis(process.env.REDIS_URL ?? '');

// TODO: put this into a @types file
type FinchIndividual = {
    id: string,
    first_name: string | null,
    middle_name: string,
    last_name: string,
    preferred_name: string,
    emails: {
        data: string,
        type: 'work' | 'personal',
    }[],
    phone_numbers: {
        data: string,
        type: 'work' | 'personal' | null,
    }[],
    gender: 'female' | 'male' | 'other' | 'decline_to_specify' | null,
    dob: string,
    residence: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        postal_code: string,
        country: string
    }
}
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

            //const tokens = await redis.lrange('user_tokens', 0, -1);

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

            //console.log(directoryRes)
            //console.log(tokenData);

            // token successful, return back to location
            return res.status(200).json({ data: individualRes.data, msg: "Success" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error retrieving individual" })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};