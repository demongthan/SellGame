interface NavItem{
  label: string;
  link: string;
  children?: NavItem[];
}

export const navItems:NavItem[] = [
    {
        label:"Trang chủ",
        link:"/",
    },
    {
        label:"Nạp tiền",
        link:"#",
        children:[
            {
                label:"Nạp thẻ",
                link:"/recharge/auto-recharge"
            },
            {
                label:"Nạp thẻ ATM",
                link:"/recharge/atm-card"
            }
        ]
    },
    {
       label:"Mua tài khoản",
       link: "/buy-account?title=Mua tài khoản"
    },
    {
        label:"Dịch vụ",
        link:"/service?title=Dịch vụ"
    },
    {
        label:"Mua thẻ",
        link:"buy-card"
    }
]