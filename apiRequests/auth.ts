import { register } from "module";
import { ImageDetailDto } from "./DataDomain/ImageDetail/ImageDetailDto";
import http from "./http";
import { GoogleSignInDto } from "./DataDomain/Auth/GoogleSignInDto";
import { ForgetPasswordDto } from "./DataDomain/Auth/ForgetPasswordDto";

export const authApiRequest = {
    register: (body: RegisterDto) => 
        http.post<ApiReponse<LoginModelDto>>('/Authentication/register', false, body),

    registerGoogle:(body:GoogleSignInDto)=>
        http.post<ApiReponse<LoginModelDto>>('/Authentication/GoogleSignUp', false, body),

    loginGoogle:(body:GoogleSignInDto)=>
        http.post<ApiReponse<LoginModelDto>>('/Authentication/GoogleSignIn', false, body),

    login: (body: AccountSignInDto) =>
        http.post<ApiReponse<LoginModelDto>>('/Authentication/login', false, body),

    forgetPassword:(body:ForgetPasswordDto)=>
    http.put<ApiReponse<boolean>>("/Authentication/ForgetPassword", false, body),

    logout:(userName:string |undefined)=>
        http.put<ApiReponse<string>>(`/Authentication/revoke/${userName}`,false, {}),

    getAllImageUrl:(code:string) =>
        http.get<ApiReponse<ImageDetailDto[]>>(`/ImageDetail/GetAllByCode/${code}?fileds=PathUrl`, false),
}