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
            let code = req.query.code;
            const embedded = req.query.embedded;
            let body = {};
            // NOTE: embedded Finch Connect flow will fail if redirect_uri is included in the POST body, since it is not needed because, well, it is embedded and not redirecting.
            if (embedded == 'true') {
                body = {
                    client_id: process.env.FINCH_CLIENT_ID,
                    client_secret: process.env.FINCH_CLIENT_SECRET,
                    code: code
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
                headers: {
                    'Content-Type': 'application/json',
                    'Finch-API-Version': '2020-09-17'
                },
                data: body
            });

            const introRes = await axios({
                method: 'get',
                url: `${process.env.FINCH_API_URL}/introspect`,
                headers: {
                    Authorization: `Bearer ${authRes.data.access_token}`,
                    'Finch-API-Version': '2020-09-17',
                    'Content-Type': 'application/json'
                },
            });

            /*
                This is not secure!
                This is only for demo purposes.
                Storing access tokens in a secure database and retrieved from a backend server ideal. 
            */
            database.setConnectionToken(authRes.data.access_token)

            // token successful, redirect to directory
            return res.redirect('/directory');
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error retrieving access token.")
        }
    }

    return res.status(405).json("Method not implemented.")


};