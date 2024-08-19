import axios from "axios";
import moment from "moment";
import { NextResponse } from "next/server";
import envConfig from "@/config";

export const POST=async (request: any)=> {
    const { amount, code } = await request.json();
    const date = moment(new Date()).format('YYYY-MM-DD');

    try{
        const response = await axios.get(`https://oauth.casso.vn/v2/transactions?sort=desc&fromDate=${date}`, {
            headers: {
                'Authorization': `Apikey ${envConfig.NEXT_PUBLIC_CASSO_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if(response.status==200){
            if(response.data.records.findIndex((_:any)=>_.amount==amount && _.description.includes(code))>0){
                

                return NextResponse.json(
                    {isSuccess:true, message:"Giao dịch thất bại. Liên hệ với quản trị viên "}
                )
            }
            else{
                return NextResponse.json(
                    {isSuccess:false, message:"Giao dịch thất bại. Liên hệ với quản trị viên "}
                )
            }
        }
        else{
            return NextResponse.json(
                {isSuccess:false, message:"Lỗi Server. Vui lòng liên hệ Quản trị viên."}
            )
        }

    }
    catch{
        return NextResponse.json(
            {isSuccess:false, message:"Lỗi Server. Vui lòng liên hệ Quản trị viên."}
        )
    }
}