import { ServiceDetailDto } from "./ServiceDetailDto";

export interface ServiceDetailSearchDto{
    serviceDetails:ServiceDetailDto[],
    metaData:MetaData
}