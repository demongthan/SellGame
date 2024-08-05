import { HeaderItem } from "./types"

export const adminMemberTable:HeaderItem[]=[
    {
      Header:"USERNAME",
      TitleHeader: "Tài khoản",
      accessor: "DisplayName",
    },
    {
      Header:"PHONE",
      TitleHeader: "Số DT",
      accessor: "Phone",
    },
    {
      Header:"EMAIL",
      TitleHeader: "Email",
      accessor: "Email",
    },
    {
      Header:"BALANCE",
      TitleHeader: "Số dư",
      accessor: "Balance",
    },
    {
      Header:"ACOINBALANCE",
      TitleHeader: "Số dư Acoin",
      accessor: "AcoinBalance",
    },
    {
      Header:"PROMOTIONALBALANCE",
      TitleHeader: "Số dư khuyến mãi",
      accessor: "PromotionalBalance",
    },
    {
      Header:"ACTIVE",
      TitleHeader: "Hiệu lực",
      accessor: "Active",
    },
    {
      TitleHeader:"Ngày đăng kí",
      Header: "REGISTERDATE",
      accessor: "CreatedDateUtc",
    },
    {
      TitleHeader:"",
      Header: "ACTION",
      accessor: "Action",
    },
]