import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../../util/redis'

type FinchPayStatementRes = {
    responses: {
        payment_id: string,
        code: number
        body: {
            paging: {
                count: number,
                offset: number
            },
            pay_statements: FinchPayStatement[]
        }
    }[]
}

export default async function PayStatement(req: NextApiRequest, res: NextApiResponse) {
    const { payment_id } = req.query;
    console.log(req.method + ` /api/finch/pay-statement/${payment_id}`);

    if (req.method == 'GET') {
        try {
            const token = await redis.get('current_connection');
            const payStatementRes = await axios.request<FinchPayStatementRes>({
                method: 'post',
                url: 'https://api.tryfinch.com/employer/pay-statement',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Finch-API-Version': '2020-09-17'
                },
                data: {
                    requests: [
                        { payment_id: payment_id }
                    ]
                }
            });

            console.log(payStatementRes.data.responses[0].body)

            // get individual pay statement successful, return back to location
            return res.status(200).json({ data: payStatementRes.data.responses[0].body.pay_statements });
        } catch (error) {
            //console.error(error);
            return res.status(500).json({ msg: "Error retrieving pay statement " + payment_id })
        }
    }

    return res.status(405).json({ msg: "Method not implemented." })


};