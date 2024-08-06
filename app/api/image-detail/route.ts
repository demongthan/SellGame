import { NextResponse } from "next/server";
import { z } from "zod";

const mySchemaCreate = z.object({
    code: z.string().min(3, {message:"Mã số phải chứa ít nhất 3 kí tự"}).max(100),
})

export const POST=async (request: any)=> {
    const data=await request.formData();
    let res:any;

    res=mySchemaCreate.safeParse({
        code: data.get("Code"),
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
        const dataReturn: CreateImageDetailDto={
            Code: data.get("Code"),
            Description: data.get("Description"),
            Active: data.get("Active")=="on"?true:false,
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}