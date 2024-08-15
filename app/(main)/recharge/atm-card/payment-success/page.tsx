import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import crypto from 'crypto';

const PaymentSuccess  = () => {
    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        const vnp_HashSecret:any = process.env.VNP_HASHSECRET;
        const vnp_SecureHash:any = query.vnp_SecureHash;
        delete query.vnp_SecureHash;

        const signData = Object.keys(query)
        .sort()
        .map((key) => `${key}=${query[key]}`)
        .join('&');
        const hmac = crypto.createHmac('sha512', vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (vnp_SecureHash === signed) {
            console.log('Payment success');
        } else {
            console.log('Invalid signature');
        }
    }, [query]);
    
    return (
        <div>Payment Success</div>
    )
}

export default PaymentSuccess 