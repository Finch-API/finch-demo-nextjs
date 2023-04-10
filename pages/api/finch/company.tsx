import axios, { AxiosError, AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { finchApiUrl, sandboxApiUrl } from '../../../util/constants';
import database from '../../../util/database'

export default async function Company(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method + " /api/finch/company ");

    if (req.method == 'GET') {
        const token = await database.getConnectionToken()
        const apiUrl = (await database.isSandbox()) ? sandboxApiUrl : finchApiUrl


        const axiosRes = await axios.get(`${apiUrl}/employer/company`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Finch-API-Version': '2020-09-17'
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

    return res.status(405).json("Method not implemented.")


};