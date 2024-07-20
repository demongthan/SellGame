import http from "./http";

export const authApiRequest = {
    register: (body: RegisterDto) => 
        http.post<ApiReponse<LoginModelDto>>('/Authentication/Register', body),

    login: (body: AccountSignInDto) =>
        http.post<ApiReponse<LoginModelDto>>('/Authentication/login', body),

    getAllImageUrl:(code:string) =>
        http.get<ApiReponse<ImageDetailDto[]>>(`/ImageDetail/GetAllByCode/${code}?fileds=PathUrl`),
}