import envConfig from "@/config";
import { ServiceDetailDto } from "./DataDomain/ServiceDetail/ServiceDetailDto";
import { ServiceDetailSearchDto } from "./DataDomain/ServiceDetail/ServiceDetailSearchDto";
import http from "./http";

export const serviceDetailApiRequest={
    getAllServiceDetailActive:()=>
        http.get<ApiReponse<ServiceDetailDto[]>>(`/ServiceDetail/GetAllServiceDetailActive`, false),

    getAllServiceDetail:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<ServiceDetailSearchDto>>(`/ServiceDetail/GetAllServiceDetail?Fields=Id%2CName%2CTransaction%2CMethod%2CUnitPrice%2CUnit%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false),
}