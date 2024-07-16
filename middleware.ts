import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const privatePaths = ['/me']
const authPaths = ['/login', '/register']

export const middleware=(request: NextRequest)=> {
    const { pathname } = request.nextUrl;
    const accessToken = cookies().get('AccessToken')?.value;

    if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/register']
}