import envConfig from "@/config";
import { ServiceDetailDto } from "./DataDomain/ServiceDetail/ServiceDetailDto";
import { ServiceDetailSearchDto } from "./DataDomain/ServiceDetail/ServiceDetailSearchDto";
import http from "./http";
import { UpdateServiceDetailDto } from "./DataDomain/ServiceDetail/UpdateServiceDetailDto";
import { PayServiceInitDto } from "./DataDomain/ServiceDetail/PayServiceInitDto";

export const serviceDetailApiRequest={
    getAllServiceDetailActive:()=>
        http.get<ApiReponse<ServiceDetailDto[]>>(`/ServiceDetail/GetAllServiceDetailActive`, false),
    
    createServiceDetail:(body:CreateAccGameDetailDto)=>
        http.post<ApiReponse<boolean>>(`/ServiceDetail/CreateServiceDetail`,false, body),

    updateServiceDetail:(input:{id:string, body:UpdateServiceDetailDto})=>
        http.put<ApiReponse<boolean>>(`/ServiceDetail/UpdateServiceDetail/${input.id}`, false, input.body),

    deleteServiceDetail:(id:string)=>
        http.delete<ApiReponse<boolean>>(`/ServiceDetail/DeleteServiceDetail/${id}`, false),

    uploadImageServiceDetail:(input:{id:string | null, body: FormData})=>
        http.put<ApiReponse<boolean>>(`/ServiceDetail/UpdateUrlServiceDetail/${input.id}`, false, input.body),

    getServiceDetailById:(input:{id:string, fields:string})=>
        http.get<ApiReponse<ServiceDetailDto>>(`/ServiceDetail/GetServiceDetailById/${input.id}${input.fields}`, false),

    getPayServiceInit:(input:{id:string, fields:string})=>
        http.get<ApiReponse<PayServiceInitDto>>(`/ServiceDetail/GetPayServiceInit/${input.id}${input.fields}`, false),

    getAllServiceDetail:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<ServiceDetailSearchDto>>(`/ServiceDetail/GetAllServiceDetail?Fields=Id%2CName%2CTransaction%2CMethod%2CUnitPrice%2CUnit%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false),
}