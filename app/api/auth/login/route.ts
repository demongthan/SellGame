import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from 'zod'

const mySchema = z.object({
    userName: z.string().trim().min(2, {message:"Tài khoản chứa ít nhất 2 kí tự"}).max(256),
    password: z.string().min(6, {message:"Mật khẩu phải chứa ít nhất 6 kí tự"}).max(15),
    })

export const POST=async (request: any)=> {
    const data=await request.formData();

    const res=mySchema.safeParse({
        userName: data.get("userName"),
        password: data.get("password"),
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
        let dataReturn:AccountSignInDto={
            UserName: data.get("userName"),
            Password: data.get("password")
        }

        const cookieStore = cookies();
        const isRemember:string=data.get("remember");
        cookies().set('Remember', isRemember, { httpOnly:true})

        if(isRemember=="remember"){
            cookies().set('UserName', dataReturn.UserName, { httpOnly:true});
            cookies().set('Password', dataReturn.Password, { httpOnly:true});
        }
        else{
            cookieStore.delete('UserName');
            cookieStore.delete('Password');
        }

        return NextResponse.json(
            {isSuccess:res.success, data:dataReturn}
        )
    }
}

export const GET=(request: any)=>{
    const cookieStore = cookies();
    let returnData:{userName:any, password:any, remember:any}={userName:"", password:"", remember:"notremember"};

    if(cookieStore.get("Remember")){
        const isRemember:any=cookieStore.get("Remember")?.value;

        if(isRemember=="remember"){
            returnData={
                userName:cookieStore.get("UserName")?.value,
                password:cookieStore.get("Password")?.value,
                remember:"remember"
            }
        }
    }

    return NextResponse.json({status:200, data:returnData})
}