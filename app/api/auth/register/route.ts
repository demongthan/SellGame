import { NextResponse } from "next/server";
import { z } from 'zod'

const vietnamesePhoneRegex = /^(0[1-9][0-9]{8})$/;

const mySchema = z.object({
        userName: z.string().trim().min(2, {message:"Tài khoản chứa ít nhất 2 kí tự."}).max(256),
        email:z.string().trim().email("Email không đúng"),
        phone: z.string().regex(vietnamesePhoneRegex, "Số điện thoại không đúng."),
        password: z.string().min(6, {message:"Mật khẩu phải chứa ít nhất 6 kí tự."}).max(15),
        confirmPassword: z.string().max(15)
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

export const POST=async (request: any)=> {
    const data=await request.formData();

    const res=mySchema.safeParse({
        userName: data.get("UserName"),
        email:data.get("Email"),
        phone:data.get("Phone"),
        password: data.get("Password"),
        confirmPassword: data.get("ConfirmPassword")
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
            UserName: data.get("UserName"),
            Email: data.get("Email"),
            Phone: data.get("Phone"),
            Password: data.get("Password"),
            ConfirmPassword: data.get("ConfirmPassword")
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}