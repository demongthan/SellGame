interface UpdateAccGameDetailDto{
    Price:number,
    Description?: string,
    Discount:number,
    Deposit:number,
    Active:boolean,
    Properties?:string,
    ReturnProperties?:string
}