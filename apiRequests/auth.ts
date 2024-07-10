import { RegisterBodyType, RegisterResType } from "../schemaValidations/auth.schema";
import http from "./http";

const authApiRequest = {
    register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),
}