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
                link:"/recharge/card"
            },
            {
                label:"Nạp thẻ ATM",
                link:"/recharge/atm-card"
            }
        ]
    },
    {
       label:"Mua tài khoản",
       link: "/buy-account?title='Mua tài khoản'/atm-card"
    },
    {
        label:"Dịch vụ",
        link:"/service"
    },
    {
        label:"Mua thẻ",
        link:"buy-card"
    }
]