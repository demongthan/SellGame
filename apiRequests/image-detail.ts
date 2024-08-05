import envConfig from "@/config";
import { ImageDetailSearchDto } from "./DataDomain/ImageDetail/ImageDetailSearchDto";
import http from "./http";

export const imageDetailApiRequest={
    getAllImageDetail:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<ImageDetailSearchDto>>(`/ImageDetail/GetAllImageDetail?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false)
}