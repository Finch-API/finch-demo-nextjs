import Container from './container'
import { useFinchConnect, ErrorEvent, SuccessEvent, } from 'react-finch-connect';
//import { useProfile } from '../lib/user-profile';

export function FinchConnect(embedded = true) {
    const onSuccess = (e: SuccessEvent) => {
        //setCode(e.code);
        if (embedded)
            return fetch(`/api/finch/callback?code=${e.code}&embedded=${embedded}`)

    }
    const onError = (e: ErrorEvent) => console.error(e.errorMessage);
    const onClose = () => console.log("User exited Finch Connect");

    const { open: openFinchConnect } = useFinchConnect({
        clientId: process.env.NEXT_PUBLIC_FINCH_CLIENT_ID ?? '',
        //payrollProvider: '<payroll-provider-id>',
        products: ["company", "directory", "individual", "employment", "payment", "pay_statement", "benefits"],
        sandbox: true,
        onSuccess,
        onError,
        onClose
    });
    return { openFinchConnect }
}