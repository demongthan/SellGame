import { ChangePasswordDto } from "@/apiRequests/DataDomain/Account/ChangePasswordDto";
import { NextResponse } from "next/server";
import { z } from 'zod'

const mySchema = z.object({
    oldPassword: z.string().min(6, {message:"Mật khẩu phải chứa ít nhất 6 kí tự"}).max(15),
    password: z.string().min(6, {message:"Mật khẩu phải chứa ít nhất 6 kí tự"}).max(15),
    confirmPassword: z.string().max(15)
    })
.strict()
.superRefine(({ oldPassword ,confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
    })}

    if (oldPassword == password) {
        ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu mới giống mật khẩu cũ',
        path: ['password']
    })}
})

export const POST=async (request: any)=> {
    const data=await request.formData();

    const res=mySchema.safeParse({
        oldPassword: data.get("oldPassword"),
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
        const dataReturn: ChangePasswordDto={
            OldPassword: data.get("oldPassword"),
            Password: data.get("password"),
            ConfirmPassword: data.get("confirmPassword")
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}