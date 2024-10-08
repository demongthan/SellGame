import {NextRequest, NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { UserRole } from '@/utils/types/Enum/UserRole';

export const POST=async (request: NextRequest)=> {
    const body = await request.json();

    const accessToken = body.accessToken as string;
    const refreshToken = body.refreshToken as string;
    const expiresAt=body.expiresAt as number;
    const role=body.role as string;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Không nhận được session token' }
      )
    }
    
    const expiresDate = new Date(expiresAt*1000);
    if(role==UserRole.User){
      cookies().set('AccessToken', accessToken, { httpOnly:true, expires: expiresDate});
      cookies().set('RefreshToken', refreshToken, { httpOnly:true, expires: expiresDate})
    }
    else{
      cookies().set('AdminAccessToken', accessToken, { httpOnly:true, expires: expiresDate});
      cookies().set('AdminRefreshToken', refreshToken, { httpOnly:true, expires: expiresDate})
    }

    return NextResponse.json({status:200});
}

export const GET=async (request: NextRequest)=>{
  const cookieStore = cookies()
  const accessToken:any = cookieStore.get('AccessToken');

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

  cookieStore.delete('AccessToken');
  cookieStore.delete('RefreshToken');

  return NextResponse.json({status:200});
}