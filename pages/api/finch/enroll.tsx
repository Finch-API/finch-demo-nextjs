import axios, { AxiosError, AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { finchApiUrl, sandboxApiUrl } from '../../../util/constants';
import database from '../../../util/database'


export default async function Enroll(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { individual_id, type, amount, benefit_id } = req.body;
        console.log("Request Body: " + JSON.stringify(req.body));

        const token = await database.getConnectionToken();
        const apiUrl = await database.isSandbox() ? sandboxApiUrl : finchApiUrl;

        const axiosRes = await axios.post(`${apiUrl}/employer/benefits/${benefit_id}/individuals`, [{
            individual_id: individual_id,
            configuration: {
                employee_deduction: { type: type, amount: amount },
                catch_up: false,
                annual_maximum: 500000
            }
        }], {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Finch-API-Version': '2020-09-17',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(async (response: AxiosResponse) => {
            return res.status(200).json(response?.data);
        }).catch((err: AxiosError) => {
            switch (err.response?.status) {
                case 400:
                    return res.status(400).json(err.response?.data)
                case 401:
                    return res.status(401).json(err.response?.data)
                case 501:
                    return res.status(501).json(err.response?.data)
                default:
                    return res.status(500).json("Error retrieving information")
            }
        });
        return axiosRes
        }
    }