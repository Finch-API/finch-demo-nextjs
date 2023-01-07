import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../util/database'

type FinchTokenRes = {
    access_token: string
}

export default async function Callback(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/callback ");

    if (req.method == 'GET') {
        try {
            const code = req.query.code;
            const state = req.query.state
            const embedded = req.query.embedded;

            let body = {};
            // NOTE: embedded Finch Connect flow will fail if redirect_uri is included in the POST body, since it is not needed because, well, it is embedded and not redirecting.
            if (embedded) {
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
                url: `${process.env.FINCH_API_URL}/auth/token`,
                data: body
            })

            /*
                This is not secure!
                This is only for demo purposes.
                Storing access tokens in a secure database and retrieved from a backend server ideal. 

                [insert link to docs]
            */
            database.setConnection(authRes.data.access_token)

            // token successful, redirect to directory
            return res.redirect('/directory');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error retrieving access token." })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};