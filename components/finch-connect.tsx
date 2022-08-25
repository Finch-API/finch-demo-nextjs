import Container from './container'
import { useState, useEffect, ChangeEvent } from 'react';
import { ErrorEvent, SuccessEvent, useFinchConnect } from 'react-finch-connect';
//import { useProfile } from '../lib/user-profile';


//const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FinchConnect() {
    // const { profile, isError, isLoading } = useProfile();
    // if (isError) return <div>{isError.message}</div>;
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        console.log(code);
    }, [code])

    const onSuccess = (e: SuccessEvent) => {
        setCode(e.code);
        return fetch(`/api/finch/callback?code=${code}&type=embedded`)
    }
    const onError = (e: ErrorEvent) => console.error(e.errorMessage);
    const onClose = () => console.log("User exited Finch Connect");

    const { open } = useFinchConnect({
        clientId: process.env.NEXT_PUBLIC_FINCH_CLIENT_ID ?? '',
        //payrollProvider: '<payroll-provider-id>',
        products: ["company", "directory"],
        sandbox: true,
        onSuccess,
        onError,
        onClose,
    });

    return (
        <>
            <p className="text-2xl max-w-2xl mb-2">
                One integration unlocks a seamless experience across 140+ payroll and HRIS providers.
            </p>
            <div className='flex space-x-4'>
                <button type='button' onClick={() => open()} className="inline-flex items-center justify-center px-5 py-3 mt-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"> Finch Connect - embedded</button>
                <a href="https://connect.tryfinch.com/authorize?&client_id=1726a5a4-39eb-4297-9ad5-4ad26a7aa251&products=company directory&redirect_uri=http://localhost:3000/api/finch/callback&sandbox=true" className="inline-flex items-center justify-center px-5 py-3 mt-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"> Finch Connect - redirect</a>
            </div>

        </>
    )
}
