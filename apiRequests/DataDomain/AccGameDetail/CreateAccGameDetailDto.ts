interface CreateAccGameDetailDto{
    IdCategory:string | undefined,
    Description?: string,
    Price:number,
    Discount:number,
    Deposit:number,
    Active:boolean,
    Properties?:string,
    ReturnProperties?:string
}