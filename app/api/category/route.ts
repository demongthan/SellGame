import { CreateCategoryDto } from "@/apiRequests/DataDomain/Category/CreateCategoryDto";
import { NextResponse } from "next/server";
import { z } from "zod";

const mySchema = z.object({
    name: z.string().min(3, {message:"Danh mục phải chứa ít nhất 3 kí tự"}).max(4000),
})

export const POST=async (request: any)=> {
    const data=await request.formData();
    let res:any;

    res=mySchema.safeParse({
        name: data.get("Name"),
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
        return NextResponse.json(
            {isSuccess:res.success}
        )
    }
}