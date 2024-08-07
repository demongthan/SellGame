interface CreateAccGameDetailDto{
    IdCategory:string | undefined,
    Price:number,
    Discount:number,
    Deposit:number,
    Active:boolean,
    Properties?:string
}