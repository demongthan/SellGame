import { DepositMoneyByCardDto } from "./DataDomain/TransactionHistory/DepositMoneyByCardDto";
import http from "./http";

export const transactionHistoryApiRequest={
    depositMoneyByCard:(input:{id:string | undefined, body:DepositMoneyByCardDto})=>
        http.post<ApiReponse<boolean>>(`/TransactionHistory/DepositMoneyByCard/${input.id}`, false, input.body),
}