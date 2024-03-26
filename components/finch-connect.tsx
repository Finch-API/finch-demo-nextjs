import { useFinchConnect, ErrorEvent, SuccessEvent, } from 'react-finch-connect';
import { baseUrl } from '../util/constants'


type FinchConnectOptions = {
    products?: string[],
    embedded?: boolean,
    sandbox?: boolean,
    payroll_provider?: string
}
const products = ["company", "directory", "individual", "employment", "payment", "pay_statement", "benefits"]

const provider = "provider";

export function FinchConnect(options?: FinchConnectOptions) {
    const onSuccess = async (e: SuccessEvent) => {
        //return fetch(`/api/finch/callback?code=${e.code}&embedded=${options.embedded}`)
        return await fetch(`${baseUrl}/api/finch/sandbox/gusto`)
    }
    const onError = (e: ErrorEvent) => console.error(e.errorMessage);
    const onClose = () => console.log("User exited Finch Connect");

    const redirectFinchConnect = `https://connect.tryfinch.com/authorize?client_id=${process.env.NEXT_PUBLIC_FINCH_CLIENT_ID}&products=${products.join(' ')}&redirect_uri=${baseUrl}/api/finch/callback&sandbox=provider&state=testing123`
    const { open: embeddedFinchConnect } = useFinchConnect({
        clientId: process.env.NEXT_PUBLIC_FINCH_DEMO_CLIENT_ID ?? '',
        payrollProvider: options?.payroll_provider,
        products: products,
        sandbox: provider, // Set sandbox=false if using Dev or Prod credentials
        manual: false,
        onSuccess,
        onError,
        onClose
    });

    return { embeddedFinchConnect, redirectFinchConnect }
}