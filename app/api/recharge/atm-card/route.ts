import moment from "moment";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import envConfig from "@/config";
import { generateRandomUppercaseString } from "@/utils/utils";
import axios from "axios";

export const POST=async (request: any)=> {
    const { amount} = await request.json();

    const date = moment(new Date()).format('YYYYMMDDHHmmss');

    const partnerCode:any = envConfig.NEXT_PUBLIC_MOMO_PARTNER_CODE;
    const accessKey:any = envConfig.NEXT_PUBLIC_MOMO_ACCESS_KEY;
    const secretKey:any = envConfig.NEXT_PUBLIC_MOMO_SECRET_KEY;
    const endpoint:any = envConfig.NEXT_PUBLIC_MOMO_ENDPOINT;

    const orderId:string = `MR${generateRandomUppercaseString(5)}${date}`;
    const requestId:string = `MR${generateRandomUppercaseString(5)}${date}`;
    const orderInfo:string = 'Thanh toán đơn hàng';
    const returnUrl:string = envConfig.NEXT_PUBLIC_MOMO_RETURN_URL;
    const ipnUrl:string = envConfig.NEXT_PUBLIC_MOMO_IPN_URL;

    const rawSignature:string = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=payWithMethod`;

    const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

    const requestBody:any = {
        partnerCode: partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: returnUrl,
        ipnUrl: ipnUrl,
        lang: 'vi',
        requestType: 'payWithMethod',
        autoCapture: true,
        extraData: '',
        orderGroupId: '',
        signature: signature,
    };

    try {
        const { data } = await axios.post(endpoint, JSON.stringify(requestBody),{
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(requestBody))
        }});

        return NextResponse.json(
            {isSuccess:true, payUrl: data.payUrl}
        )
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message}
        )
    }
}