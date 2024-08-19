import { DepositMoneyByCardDto } from "@/apiRequests/DataDomain/TransactionHistory/DepositMoneyByCardDto";
import { cardTypeSelect } from "@/utils/constant/CardTypeSelect";
import { faceValueCardSelect } from "@/utils/constant/FaceValueCardSelect";
import moment from "moment";
import { NextResponse } from "next/server";
import { z } from "zod";
import envConfig from "@/config";
import { createHash } from 'crypto';
import axios from 'axios';
import { RechargeCardStatus } from "@/utils/constant/Transaction/RechargeCardStatus";
import { isNullOrEmpty } from "@/utils/utils";
import { CreateTransactionHistoryCardDto } from "@/apiRequests/DataDomain/TransactionHistoryCard/CreateTransactionHistoryCardDto";
import { TransactionStatus } from "@/utils/constant/Transaction/TransactionStatus";

const statusProcess:number[]=[1, 2, 3, 4, 99]

const setMessageError=(numberCode:number):string=>{
    let message:string="";
    switch (numberCode) {
        case RechargeCardStatus.VALUE_ERROR:
            message="Thẻ hợp lệ nhưng sai mệnh giá.";
            break;
        case RechargeCardStatus.ERROR:
            message="Thẻ không hợp lệ.";
            break;
        case RechargeCardStatus.MAINTENANCE:
            message="Hệ thống đang bảo trì.";
            break;
        default:
            break;
    }
    return message;
}

const mySchema = z.object({
    cardNumber: z.string().min(3, {message:"Mã số thẻ phải chứa ít nhất 3 kí tự"}).max(500),
    serialNumber:z.string().min(3, {message:"Mã Serial phải chứa ít nhất 3 kí tự"}).max(500),
    securityCode:z.string().min(3, {message:"Mã bảo vệ phải chứa 3 kí tự"}).max(3),
    autoSecurityCode:z.string().min(3, {message:"Mã bảo vệ phải chứa 3 kí tự"}).max(3)
})
.strict()
    .superRefine(({ securityCode, autoSecurityCode }, ctx) => {
        if (Number(securityCode) != Number(autoSecurityCode)) {
            ctx.addIssue({
            code: 'custom',
            message: 'Mã bảo vệ không chính xác',
            path: ['securityCode']
        })
    }
})


export const POST=async (request: any)=> {
    const data=await request.formData();
    let res:any;

    res=mySchema.safeParse({
        cardNumber: data.get("CardNumber").toString(),
        serialNumber: data.get("SerialNumber").toString(),
        securityCode: data.get("SecurityCode").toString(),
        autoSecurityCode: data.get("AutoSecurityCode").toString(),
    });

    if (!res.success) {
        let errArr: ErrorValidate[] = [];

        const { errors: err } = res.error;
        for (let i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }

        return NextResponse.json(
            {isSuccess:res.success, data:errArr}
        )
    }
    else{
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');

        const tsr_Params:any={
            telco:cardTypeSelect[cardTypeSelect.findIndex(_=>_.Name==data.get("CardType").toString())].Value,
            code:data.get("CardNumber").toString(),
            serial:data.get("SerialNumber").toString(),
            amount:Number(faceValueCardSelect[faceValueCardSelect.findIndex(_=>_.Name==data.get("ValueCardType").toString())].Value),
            request_id:`RAR${createDate}`,
            partner_id:envConfig.NEXT_PUBLIC_PARTNER_ID_CHANGE,
            sign:"",
            command:"charging"
        }

        const sign:string=envConfig.NEXT_PUBLIC_PARTNER_KEY_CHANGE+tsr_Params["code"]+tsr_Params["command"]+tsr_Params["partner_id"]+tsr_Params["request_id"]+tsr_Params["serial"]+tsr_Params["telco"];
        const md5=createHash('md5');
        tsr_Params["sign"]=md5.update(sign).digest('hex');

        const dataRequest = new FormData();
        Object.keys(tsr_Params).map((key)=>{
            dataRequest.append(key, tsr_Params[key]);
        })

        try{
            const response = await axios.post('https://thesieure.com/chargingws/v2', dataRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!statusProcess.includes(Number(response.data.status))){
                return NextResponse.json(
                    {isSuccess:false, message:"Lỗi Server. Vui lòng liên hệ Quản trị viên."}
                )
            }
            
            const message:string =setMessageError(response.data.status);

            if(isNullOrEmpty(message)){
                const dataReturn:CreateTransactionHistoryCardDto={
                    Code: tsr_Params["request_id"],
                    Status:Number(response.data.status)==RechargeCardStatus.SUCCESS?TransactionStatus.Success:TransactionStatus.Process,
                    DeclaredValue:tsr_Params["amount"],
                    Amount:Number(tsr_Params["amount"])*0.7,
                    Telco:tsr_Params["telco"],
                    CodeCard: tsr_Params["code"],
                    SerialNumber:tsr_Params["serial"],
                    SecurityCode:data.get("SecurityCode").toString(),
                }

                return NextResponse.json(
                    {isSuccess:true, data:dataReturn}
                )
            }
            else{
                return NextResponse.json(
                    {isSuccess:false, message:message}
                )
            }
        }
        catch{
            return NextResponse.json(
                {isSuccess:false, message:"Lỗi Server. Vui lòng liên hệ Quản trị viên."}
            )
        }
    }
}

