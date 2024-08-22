import { CreateTransactionHistoryBankingDto } from "./DataDomain/TransactionHistoryBanking/CreateTransactionHistoryBankingDto";
import http from "./http";

export const transactionHistoryBakingApiRequest={
    createTransactionHistoryBanking:(input:{idUser:string | undefined, body:CreateTransactionHistoryBankingDto, token?:string})=>
        http.post<ApiReponse<boolean>>(`/TransactionHistoryBanking/CreateTransactionHistoryBanking/${input.idUser}`, input.body, input.token),
}