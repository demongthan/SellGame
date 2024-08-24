import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const privatePaths = ['/recharge/account-information', '/recharge/auto-recharge']
const privateAdminPaths = ['/dashboard', '/image-detail']
const authPaths = ['/login', '/register']

export const middleware=(request: NextRequest)=> {
    const { pathname } = request.nextUrl;
    const accessToken = cookies().get('AccessToken')?.value;
    const adminAccessToken = cookies().get('AdminAccessToken')?.value;

    if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (privateAdminPaths.some((path) => pathname.startsWith(path)) && !adminAccessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (authPaths.some((path) => pathname.startsWith(path)) && adminAccessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/register', '/recharge/account-information', 
        '/dashboard', '/image-detail']
}