import { RegisterBodyType, RegisterResType } from "../schemaValidations/auth.schema";
import http from "./http";

export const authApiRequest = {
    register: (body: RegisterDto) => http.post<RegisterDto>('/Authentication/Register', body),
}