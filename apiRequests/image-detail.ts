import envConfig from "@/config";
import { ImageDetailSearchDto } from "./DataDomain/ImageDetail/ImageDetailSearchDto";
import http from "./http";
import { ImageDetailDto } from "./DataDomain/ImageDetail/ImageDetailDto";

export const imageDetailApiRequest={
    getAllImageDetail:(input:{search:string, pageNumber:number, token:string | undefined})=>
        http.get<ApiReponse<ImageDetailSearchDto>>(`/ImageDetail/GetAllImageDetail?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, input.token),

    createImageDetail:(input:{body:CreateImageDetailDto, token:string | undefined})=>
        http.post<ApiReponse<boolean>>(`/ImageDetail/CreateImageDetail`, input.body, input.token),

    getImageDetailById:(input:{id:string | null, fields:string, token:string|undefined})=>
        http.get<ApiReponse<ImageDetailDto>>(`/ImageDetail/GetImageDetailById/${input.id}?fileds=${input.fields}`, input.token),

    updateImageDetail:(input:{id:string | null, body:UpdateImageDetailDto, token:string|undefined})=>
        http.put<ApiReponse<boolean>>(`/ImageDetail/UpdateImageDetail/${input.id}`, input.body, input.token),

    deleteImageDetail:(input:{id:string | null, token:string|undefined})=>
        http.delete<ApiReponse<boolean>>(`/ImageDetail/DeleteImageDetail/${input.id}`, input.token),

    uploadImageForImageDetail:(input:{id:string | null, body: FormData, token:string| undefined})=>
        http.put<ApiReponse<boolean>>(`/ImageDetail/UpdateUrlImageDetail/${input.id}`, input.body, input.token),
}