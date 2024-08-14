import { ForgetPasswordDto } from "@/apiRequests/DataDomain/Auth/ForgetPasswordDto";
import { NextResponse } from "next/server";
import { z } from 'zod'

const mySchema = z.object({
    email:z.string().trim().min(1, {message:"Nhập email"}).email("Email không đúng định dạng"),
})


export const POST=async (request: any)=> {
    const data=await request.formData();

    const res=mySchema.safeParse({
        email: data.get("Email")
    });

    if (!res.success) {
        let errArr: ErrorValidate[] = [];

        const { errors: err } = res.error;
        for (var i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }

        return NextResponse.json(
            {isSuccess:res.success, data:errArr}
        )
    }
    else{
        const dataReturn:ForgetPasswordDto={
            email:data.get("Email").toString()
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}