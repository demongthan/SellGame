import { DepositMoneyByCardDto } from "@/apiRequests/DataDomain/TransactionHistory/DepositMoneyByCardDto";
import { cardTypeSelect } from "@/utils/constant/CardTypeSelect";
import { faceValueCardSelect } from "@/utils/constant/FaceValueCardSelect";
import { NextResponse } from "next/server";
import { z } from "zod";

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
        const dataReturn:DepositMoneyByCardDto={
            NetworkOperator: cardTypeSelect[cardTypeSelect.findIndex(_=>_.Name==data.get("CardType").toString())].Value,
            CardCode: data.get("CardNumber").toString(),
            FaceValue: Number(faceValueCardSelect[faceValueCardSelect.findIndex(_=>_.Name==data.get("ValueCardType").toString())].Value),
            Serial:data.get("SerialNumber").toString()
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}

