import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../../util/database'
import { sandboxApiUrl } from '../../../../util/constants'

type SandboxRes = {
    payroll_provider_id: string,
    company_id: string,
    access_token: string
}

export default async function Sandbox(req: NextApiRequest, res: NextApiResponse) {
    const { sandbox_id } = req.query;
    console.log(req.method + ` /api/finch/sandbox/${sandbox_id}`);

    if (req.method == 'GET') {
        try {

            const body = {
                provider_id: sandbox_id,
                products: ["company", "directory", "individual", "employment", "payment", "pay_statement", "benefits"],
                employee_size: Math.floor(Math.random() * 50)
            }

            const sandboxRes = await axios.request<SandboxRes>({
                method: 'post',
                url: `${sandboxApiUrl}/sandbox/create`,
                data: body
            })

            // Keep the newly setup connection's access_token to use for subsequent calls to Finch's APIs.
            database.setSandboxToken(sandboxRes.data.access_token)

            // token successful, return back to location
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return res.status(500).json("Error retrieving access token.")
        }
    }

    return res.status(405).json("Method not implemented.")


};