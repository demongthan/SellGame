import { CreateServiceDetailDto } from "@/apiRequests/DataDomain/ServiceDetail/CreateServiceDetailDto";
import { UpdateServiceDetailDto } from "@/apiRequests/DataDomain/ServiceDetail/UpdateServiceDetailDto";
import { methodCalculateSelects } from "@/utils/constant/MethodCalculateSelect";
import { NextResponse } from "next/server";
import { z } from "zod";

const mySchema = z.object({
    name: z.string().min(3, {message:"Danh mục phải chứa ít nhất 3 kí tự"}).max(4000),
    unitPrice: z.number({message:"Giá là số"}).min(0, {message:"Giá lơn hơn 0"}).max(999999999, {message:"Giá nhỏ hơn hoặc bằng 999 999 999"}),
    unit: z.string().min(3, {message:"Danh mục phải chứa ít nhất 3 kí tự"}).max(1000),
})

export const POST=async (request: any)=> {
    const data=await request.formData();
    let res:any;

    res=mySchema.safeParse({
        name: data.get("Name").toString(),
        unitPrice: Number(data.get("UnitPrice").toString()),
        unit: data.get("Unit").toString(),
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
        if(data.get("IsCreate")=="true"){
            const dataReturn: CreateServiceDetailDto={
               Name:data.get("Name").toString(),
               Method:methodCalculateSelects[methodCalculateSelects.findIndex(_=>_.Name==data.get("MethodCalculate"))].Value,
               UnitPrice:Number(data.get("UnitPrice").toString()),
               Unit:data.get("Unit").toString(),
               Active: data.get("Active")=="on"?true:false,
               Description:data.get("Description").toString(),
               Properties:data.get("Properties").toString()
            }
    
            return NextResponse.json(
                {isSuccess:res.success, data:dataReturn}
            )
        }
        else{
            const dataReturn: UpdateServiceDetailDto={
               Name:data.get("Name").toString(),
               UnitPrice:Number(data.get("UnitPrice").toString()),
               Unit:data.get("Unit").toString(),
               Active: data.get("Active")=="on"?true:false,
               Description:data.get("Description").toString(),
               Properties:data.get("Properties").toString()
            }
    
            return NextResponse.json(
                {isSuccess:res.success, data:dataReturn}
            )
        }
    }
}