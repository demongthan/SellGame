import moment from "moment";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import envConfig from "@/config";
import { headers } from 'next/headers'

export const POST=async (request: any)=> {
    const { amount, orderInfo } = await request.json();

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    const vnp_TmnCode:any= envConfig.NEXT_PUBLIC_VNP_TMNCODE;
    const vnp_HashSecret:any = envConfig.NEXT_PUBLIC_VNP_HASHSECRET;
    const vnp_Url:any = envConfig.NEXT_PUBLIC_VNP_URL;
    const vnp_ReturnUrl:any = envConfig.NEXT_PUBLIC_VNP_RETURNURL;

    const ipAddr = headers().get('x-forwarded-for')||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

    const vnp_Params: any = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: vnp_TmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: `TXN${Date.now()}`,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType:'other',
        vnp_Amount: amount * 100, // số tiền theo đơn vị VNĐ*100
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };
    
    const signData = Object.keys(vnp_Params)
      .sort()
      .map((key) => `${key}=${vnp_Params[key]}`)
      .join('&');
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  
    vnp_Params.vnp_SecureHash = signed;
    const vnp_UrlWithParams = `${vnp_Url}?${new URLSearchParams(vnp_Params).toString()}`;
    
    return NextResponse.json({ redirectUrl: vnp_UrlWithParams });
}