import axios from 'axios'
import Redis from 'ioredis'
import type { NextApiRequest, NextApiResponse } from 'next'

type resData = {
    msg: string
}

let redis = new Redis(process.env.REDIS_URL);

export default async function Callback(req: NextApiRequest, res: NextApiResponse<resData>) {
    console.log(req.method + " /api/finch/callback ");

    if (req.method == 'GET') {
        try {
            const code = req.query.code;
            const state = req.query.state
            const type = req.query.type;

            let body = {};
            if (type == "embedded") {
                body = {
                    client_id: process.env.PUBLIC_NEXT_FINCH_CLIENT_ID,
                    client_secret: process.env.FINCH_CLIENT_SECRET,
                    code: code,
                }
            } else {
                body = {
                    client_id: process.env.PUBLIC_NEXT_FINCH_CLIENT_ID,
                    client_secret: process.env.FINCH_CLIENT_SECRET,
                    code: code,
                    redirect_uri: process.env.BASE_URL + "/api/finch/callback"
                }
            }
            // embedded Finch Connect will fail if redirect_uri is included in the POST body, since it is not needed because, well, it is embedded and not redirecting.

            const authRes = await axios({
                method: 'post',
                url: 'https://api.tryfinch.com/auth/token',
                data: body
            })
            console.log(authRes.data);

            // TODO: Call the /introspect endpoint to get the user id used for token.

            await redis.lpush('tyler@tryfinch.com', authRes.data.access_token);

            // token successful, return back to location
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error retrieving access token." })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};