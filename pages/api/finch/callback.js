import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL);

export default withApiAuthRequired(async function Callback(req, res) {
    const session = getSession(req, res);
    //const router = useRouter();
    console.log(req.method + " /api/finch/callback ");
    
    if (req.method == 'GET') {
        try {
            const code = req.query.code;
            const state = req.query.state
            const type = req.query.type;

            const authHeader = Buffer.from(process.env.FINCH_CLIENT_ID + ":" + process.env.FINCH_CLIENT_SECRET).toString('base64');
    
            let body = {};
            if (type == "embedded") {
                body = {
                    code: code,
                }
            } else {
                body = {
                    code: code,
                    redirect_uri: process.env.BASE_URL + "/api/finch/callback"
                }
            }
            // embedded Finch Connect will fail if redirect_uri is included in the POST body, since it is not needed because, well, it is embedded and not redirecting.

            const authRes = await axios({
                method: 'post',
                url: 'https://api.tryfinch.com/auth/token',
                headers: {
                    Authorization: `Basic ${authHeader}`
                },
                data: body
            })
            console.log(authRes.data);

            if (session.user.org_id) {
                await redis.lpush(session.user.org_id, authRes.data.access_token);
            } else {
                await redis.lpush(session.user.email, authRes.data.access_token);
            }

            // token successful, return back to location
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: "Error retrieving access token."})
        }
    }

    return res.status(405).json({msg: "Method not implemented."})
    

});