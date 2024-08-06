import envConfig from "@/config";
import { ImageDetailSearchDto } from "./DataDomain/ImageDetail/ImageDetailSearchDto";
import http from "./http";
import { ImageDetailDto } from "./DataDomain/ImageDetail/ImageDetailDto";

export const imageDetailApiRequest={
    getAllImageDetail:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<ImageDetailSearchDto>>(`/ImageDetail/GetAllImageDetail?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false),

    createImageDetail:(body:CreateImageDetailDto)=>
        http.post<ApiReponse<boolean>>(`/ImageDetail/CreateImageDetail`, false, body),

    getImageDetailById:(input:{id:string | null, fields:string})=>
        http.get<ApiReponse<ImageDetailDto>>(`/ImageDetail/GetImageDetailById/${input.id}?fileds=${input.fields}`, false),

    updateImageDetail:(input:{id:string | null, body:UpdateImageDetailDto})=>
        http.put<ApiReponse<boolean>>(`/ImageDetail/UpdateImageDetail/${input.id}`, false, input.body),

    deleteImageDetail:(id:string | null)=>
        http.delete<ApiReponse<boolean>>(`/ImageDetail/DeleteImageDetail/${id}`, false),

    uploadImageForImageDetail:(input:{id:string | null, body: FormData})=>
        http.put<ApiReponse<boolean>>(`/ImageDetail/UpdateUrlImageDetail/${input.id}`, false, input.body),
}