import axios from 'axios'
import Redis from 'ioredis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { stringify } from 'querystring';


// TODO: make this into a react hook
let redis = new Redis(process.env.REDIS_URL ?? '');

type disconnectRes = {
    status: string
}

export default async function Disconnect(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/disconnect ");

    if (req.method == 'POST') {
        try {
            /*
                These lines are helpful if you are storing multiple access_tokens for a single organization.
                Combining payroll_provider_id + company_id to create a unique REDIS key (or org_id + payroll_provider_id + company_id)
                makes it easy to get and disconnect all tokens associated with that connection. [insert link to docs]
            */

            const { payroll_provider_id, company_id } = req.body;
            const tokens = await redis.lrange(`${payroll_provider_id}:${company_id}`, 0, -1);

            // Tell Finch to disconnect all access tokens associated with the employer/provider
            const resData = await Promise.all(tokens.map(async (token: string) => {
                let data = await axios.request<disconnectRes>({
                    method: 'POST',
                    url: 'https://api.tryfinch.com/disconnect',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Finch-API-Version': '2020-09-17'
                    },
                }).then(async (res) => {
                    // Add token to 'invalid_tokens' Redis list (blacklist)
                    await redis.lmove(`${payroll_provider_id}:${company_id}`, `invalid:${payroll_provider_id}:${company_id}`, "RIGHT", "LEFT")
                    console.log(`Disconnecting token: ${token}. Moved to invalid Redis list.`)

                    return { status: res.data.status };
                }).catch(err => {
                    // access token is (most likely) already invalid
                    console.log(err);
                    return { status: "Error disconnecting access token" }
                });
                return await data;
            }))

            // Remove the connection from the current list of user connections
            await redis.srem('user_connections', `${payroll_provider_id}:${company_id}`);

            //console.log(resData);

            // token disconnect successful, return back to location
            return await res.status(200).json({ data: resData, msg: "Success" });
        } catch (error) {
            //console.error(error);
            return res.status(500).json({ msg: "Error disconnecting access token" })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};