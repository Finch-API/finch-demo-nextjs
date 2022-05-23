import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL);

export default withApiAuthRequired(async function Introspect(req, res) {
    const session = getSession(req, res);
    //const router = useRouter();
    console.log(req.method + " /api/finch/introspect ");

    if (req.method == 'GET') {
        try {    
            const tokens = await redis.lrange(session.user.org_id, 0, -1);

            const tokenData = await Promise.all(tokens.map(async (token) => {
                const authRes = await axios({
                    method: 'get',
                    url: 'https://api.tryfinch.com/introspect',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Finch-API-Version': '2020-09-17'
                    },
                })
                const mask = "XXXXXXXX-XXXX-XXXX-XXXX-" + token.slice(token.length - 12);
                console.log(mask);
                console.log(authRes.data);
                return await { token: mask, data: authRes.data };
            }))

            console.log(tokenData);
            // token successful, return back to location
            return res.status(200).json(tokenData);
        } catch (error) {
            console.error(error);
        }
    }

    return res.status(405).json({msg: "Method not implemented."})
    

});