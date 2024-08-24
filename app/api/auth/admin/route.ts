import {NextRequest, NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export const GET=async (request: NextRequest)=>{
    const cookieStore = cookies()
    const accessToken:any = cookieStore.get('AdminAccessToken');
  
    let data:string|null;
    if(accessToken){
      data=accessToken.value;
    }
    else{
      data=null;
    }
  
    return NextResponse.json({status:200, data:data});
}
  
export const DELETE = async (request: NextRequest)=>{
    const cookieStore = cookies();

    cookieStore.delete('AdminAccessToken');
    cookieStore.delete('AdminRefreshToken');

    return NextResponse.json({status:200});
}