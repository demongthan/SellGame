import { CreateTransactionHistoryCardDto } from "./DataDomain/TransactionHistoryCard/CreateTransactionHistoryCardDto";
import http from "./http";

export const transactionHistoryCardApiRequest={
    createTransactionHistoryCard:(input:{idUser:string | undefined, body:CreateTransactionHistoryCardDto})=>
        http.post<ApiReponse<boolean>>(`/TransactionHistoryCard/CreateTransactionHistoryCard/${input.idUser}`, true, input.body),
}