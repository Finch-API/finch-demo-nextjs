import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../util/database';
import Buffer from 'buffer';

type FinchTokenRes = {
    access_token: string;
}

export default async function Callback(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/callback ");

    if (req.method === 'GET') {
        try {
            const code = req.query.code;
            const embedded = req.query.embedded;

            // Encode client_id and client_secret in Base64
            const credentials = Buffer.from(`${process.env.FINCH_CLIENT_ID}:${process.env.FINCH_CLIENT_SECRET}`).toString('base64');

            const body = {
                code: code,
                ...(embedded ? {} : { redirect_uri: `${process.env.BASE_URL}/api/finch/callback` })
            };

            const authRes = await axios.request<FinchTokenRes>({
                method: 'post',
                url: `${process.env.FINCH_API_URL}/auth/token`,
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                    'Finch-API-Version': '2020-09-17'
                },
                data: JSON.stringify(body)
            });

            // [Following logic remains unchanged]
            // Handle the response, introspection call, etc.
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error retrieving access token.");
        }
    }

    return res.status(405).json("Method not implemented.");
};