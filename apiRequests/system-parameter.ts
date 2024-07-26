import http from "./http";

export const systemParameterApiRequest={
    getSystemParameterByCode:(code:string)=>
        http.get<ApiReponse<SystemParameterDto>>(`/SystemParameter/GetSystemParameterByCode/${code}?fileds=Content`, false, {})
 
}