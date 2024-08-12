import { CreateCategoryDto } from "@/apiRequests/DataDomain/Category/CreateCategoryDto";
import { NextResponse } from "next/server";
import { z } from "zod";

const mySchemaCreate = z.object({
    name: z.string().min(3, {message:"Danh mục phải chứa ít nhất 3 kí tự"}).max(4000),
    code: z.string().min(3, {message:"Mã số phải chứa ít nhất 3 kí tự"}).max(100),
})

const mySchemaUpdate = z.object({
    name: z.string().min(3, {message:"Danh mục phải chứa ít nhất 3 kí tự"}).max(4000),
})

export const POST=async (request: any)=> {
    const data=await request.formData();
    let res:any;

    if(data.get("isCreate")=="true"){
        res=mySchemaCreate.safeParse({
            name: data.get("Name"),
            code: data.get("Code"),
        });
    }
    else{
        res=mySchemaUpdate.safeParse({
            name: data.get("Name"),
        });
    }

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
        if(data.get("isCreate")=="true"){
            const dataReturn: CreateCategoryDto={
                Name: data.get("Name"),
                Code: data.get("Code"),
                Description: data.get("Description"),
                Active: data.get("Active")=="on"?true:false,
                Properties:data.get("Properties")
            }
    
            return NextResponse.json(
                {isSuccess:res.success, data:dataReturn}
            )
        }
        else{
            const dataReturn: UpdateCategoryDto={
                Name: data.get("Name"),
                Description: data.get("Description"),
                Active: data.get("Active")=="on"?true:false,
                Properties:data.get("Properties")
            }
    
            return NextResponse.json(
                {isSuccess:res.success, data:dataReturn}
            )
        }
    }
}