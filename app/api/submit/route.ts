import { NextResponse } from "next/server";
import { z } from 'zod'

const mySchema = z.object({
        userName: z.string().trim().min(2, {message:"chứa ít nhất 2 kí tự"}).max(256),
        password: z.string().min(6, {message:"chứa ít nhất 2 kí tự"}).max(100),
        confirmPassword: z.string().min(6).max(100)
        })
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
            code: 'custom',
            message: 'Mật khẩu không khớp',
            path: ['confirmPassword']
        })
    }
})

export async function POST(request: any) {

    const data=await request.formData();

    const res=mySchema.safeParse({
        userName: data.get("userName"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword")
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
        let dataReturn:RegisterDto={
            userName: data.get("userName"),
            password: data.get("password")
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}