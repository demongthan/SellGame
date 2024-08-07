import { NextResponse } from "next/server";
import { z } from "zod";

const mySchema = z.object({
    price: z.number({message:"Giá là số"}).min(0, {message:"Giá lơn hơn 0"}).max(999999999, {message:"Giá nhỏ hơn hoặc bằng 999 999 999"}),
    discount:z.number({message:"Giảm giá là số"}).min(0, {message:"Giảm giá lơn hơn 0"}).max(99, {message:"Giảm giá nhỏ hơn 99"}),
    deposit:z.number({message:"Đặt cọc là số"}).min(0, {message:"Đặt cọc lơn hơn 0"}).max(999999999, {message:"Đặt cọc nhỏ hơn hoặc bằng 999 999 999"}),
})
.strict()
    .superRefine(({ price, deposit }, ctx) => {
        if (deposit > price) {
            ctx.addIssue({
            code: 'custom',
            message: 'Đặt cọc nhỏ hơn hoặc bằng giá',
            path: ['deposit']
        })
    }
})

export const POST=async (request: any)=> {
    const data=await request.formData();
    let res:any;

    res=mySchema.safeParse({
        price: Number(data.get("Price").toString()),
        discount: Number(data.get("Discount").toString()),
        deposit: Number(data.get("Deposit").toString()),
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
        const dataReturn: CreateAccGameDetailDto={
            IdCategory:data.get("IdCategory"),
            Price: Number(data.get("Price").toString()),
            Discount: Number(data.get("Discount").toString()),
            Deposit: Number(data.get("Deposit").toString()),
            Active: data.get("Active")=="on"?true:false,
            Properties: data.get("Properties")
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}