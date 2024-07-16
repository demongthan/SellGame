import {NextRequest, NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { date } from 'zod';

export const POST=async (request: NextRequest)=> {
    const body = await request.json();

    const accessToken = body.accessToken as string;
    const refreshToken = body.refreshToken as string;
    const expiresAt=body.expiresAt as number;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Không nhận được session token' }
      )
    }
    
    const expiresDate = new Date(expiresAt*1000);
    cookies().set('AccessToken', accessToken, { httpOnly:true, expires: expiresDate});
    cookies().set('RefreshToken', refreshToken, { httpOnly:true, expires: expiresDate})

    return NextResponse.json({status:200});
}

export const GET=async (request: NextRequest)=>{
  const cookieStore = cookies()
  const accessToken:any = cookieStore.get('AccessToken');

  let userDisplay:UserDisplay|null;
  if(accessToken){
    const jwtData:JwtPayload=jwtDecode(accessToken.value);
    
     userDisplay={
      displayName:jwtData.sub
    }
  }
  else{
    userDisplay=null;
  }

  return NextResponse.json({status:200, data:userDisplay});
}

export const DELETE = async (request: NextRequest)=>{
  const cookieStore = cookies();

  cookieStore.delete('AccessToken');
  cookieStore.delete('RefreshToken');

  return NextResponse.json({status:200});
}