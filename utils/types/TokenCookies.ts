export interface TokenCookies{
    accessToken: string, 
    expiresAt: number |undefined,
    refreshToken: string,
    role:string | undefined
}