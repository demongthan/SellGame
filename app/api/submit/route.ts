import { NextResponse } from "next/server";
import { z } from 'zod'

const mySchema = z.object({
        userName: z.string().trim().min(2).max(256),
        password: z.string().min(6).max(100),
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

export async function POST(request: FormData) {

    console.log(request);

    // mySchema.safeParse({
    //     userName: data.get("userName"),
    //     email: email,
    //     hobbies: hobbies,
    // });


    return NextResponse.json({
        request
    })
}