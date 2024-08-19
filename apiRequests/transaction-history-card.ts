import { CreateTransactionHistoryCardDto } from "./DataDomain/TransactionHistoryCard/CreateTransactionHistoryCardDto";
import http from "./http";

export const transactionHistoryCardApiRequest={
    createTransactionHistoryCard:(input:{idUser:string | undefined, body:CreateTransactionHistoryCardDto, token?:string})=>
        http.post<ApiReponse<boolean>>(`/TransactionHistoryCard/CreateTransactionHistoryCard/${input.idUser}`, input.body, input.token),
}