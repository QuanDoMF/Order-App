import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

const authApiRequests = {
    serverLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
    clientLogin: (body: LoginBodyType) => http.post<LoginResType>("api/auth/login", body, {
     baseUrl: '',
    }),
}
export default authApiRequests