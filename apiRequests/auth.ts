import { ImageDetailDto } from "./DataDomain/ImageDetail/ImageDetailDto";
import http from "./http";

export const authApiRequest = {
    register: (body: RegisterDto) => 
        http.post<ApiReponse<LoginModelDto>>('/Authentication/register', false, body),

    login: (body: AccountSignInDto) =>
        http.post<ApiReponse<LoginModelDto>>('/Authentication/login', false, body),

    logout:(userName:string |undefined)=>
        http.put<ApiReponse<string>>(`/Authentication/revoke/${userName}`,false, {}),

    getAllImageUrl:(code:string) =>
        http.get<ApiReponse<ImageDetailDto[]>>(`/ImageDetail/GetAllByCode/${code}?fileds=PathUrl`, false),
}