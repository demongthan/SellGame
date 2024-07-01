export interface MenuRechargeItem{
    title:string,
    link:string,
}

export interface MenuRecharge{
    title:string,
    item:MenuRechargeItem[]
}

export const menuRechargeAccount:MenuRecharge={
    title:"Tài khoản",
    item:[
        {
            title:"Thông tin tài khoản",
            link:"/recharge/account-information"
        },
        {
            title:"Đổi mật khẩu",
            link:"/recharge/change-password"
        }
    ]
}

export const menuRechargeTransaction:MenuRecharge={
    title:"Giao dịch",
    item:[
        {
            title:"Lịch sử giao dịch",
            link:"/recharge/transaction-history"
        },
        {
            title:"Tài khoản đã mua",
            link:"/recharge/purchased-account"
        },
        {
            title:"Dịch vụ đã mua",
            link:"recharge/purchased-service"
        },
        {
            title:"Nạp thẻ tự động",
            link:"/recharge/auto-recharge"
        },
        {
            title:"Lịch sử nạp thẻ",
            link:"recharge/recharge-history"
        },
        {
            title:"Nạp tiền từ ATM",
            link:"/recharge/atm-card"
        },
        {
            title:"Lịch sử đặt cọc",
            link:"/recharge/deposit-history"
        }
    ]
}