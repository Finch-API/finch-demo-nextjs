import axios from 'axios'
import Redis from 'ioredis'
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO: put this into a @types file
type resData = {
    msg: string
}

type FinchTokenRes = {
    access_token: string
}

// TODO: make this into a react hook
let redis = new Redis(process.env.REDIS_URL ?? '');

export default async function Callback(req: NextApiRequest, res: NextApiResponse<resData>) {
    console.log(req.method + " /api/finch/callback ");

    if (req.method == 'GET') {
        try {
            const code = req.query.code;
            const state = req.query.state
            const type = req.query.type;

            let body = {};
            // NOTE: embedded Finch Connect flow will fail if redirect_uri is included in the POST body, since it is not needed because, well, it is embedded and not redirecting.
            if (type == "embedded") {
                body = {
                    client_id: process.env.FINCH_CLIENT_ID,
                    client_secret: process.env.FINCH_CLIENT_SECRET,
                    code: code,
                }
            } else {
                body = {
                    client_id: process.env.FINCH_CLIENT_ID,
                    client_secret: process.env.FINCH_CLIENT_SECRET,
                    code: code,
                    redirect_uri: process.env.BASE_URL + "/api/finch/callback"
                }
            }

            const authRes = await axios.request<FinchTokenRes>({
                method: 'post',
                url: 'https://api.tryfinch.com/auth/token',
                data: body
            })
            //console.log(tokenRes);

            const tokenRes = await axios({
                method: 'get',
                url: 'https://api.tryfinch.com/introspect',
                headers: {
                    Authorization: `Bearer ${authRes.data.access_token}`,
                    'Finch-API-Version': '2020-09-17'
                },
            });

            /*
                Finch defines a connection as an association between a unique "provider_id" and a unique "company_id"
                Even though different credentials might be used to login, as long as the same company is using the same provider to login, 
                it only counts as one connection because the company_id and provider_id are the same. Thus, disconnecting one will disconnect the other.
                In order to handle this, you can create connection keys at a minimum combining provider_id + connection_id.
                In production, you usually combine org_id + provider_id + connection_id if you are trying to onboard more than 1 organization.
                
                Redis Sets have the desirable property of not allowing repeated members. Adding the same element multiple times will result in a set having a single copy of this element.
                So while the connection key might be not be repeated, we can add multiple access_tokens to the key via a Redis List below
                Store the access_token associated the connection's unique key added above

                [insert link to docs]
            */

            await redis.sadd('user_connections', `${tokenRes.data.payroll_provider_id}:${tokenRes.data.company_id}`)
            await redis.lpush(`${tokenRes.data.payroll_provider_id}:${tokenRes.data.company_id}`, authRes.data.access_token);
            //await redis.lpush(`${session.user.org_id}:${tokenRes.data.payroll_provider_id}:${tokenRes.data.company_id}`, authRes.data.access_token);


            // Keep the newly setup connection's access_token to use for subsequent calls to Finch's APIs.
            await redis.set('current_connection', authRes.data.access_token)



            // token successful, return back to location
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error retrieving access token." })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};