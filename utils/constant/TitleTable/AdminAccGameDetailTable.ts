import { HeaderItem } from "./types";

export const adminAccGameDetailTable:HeaderItem[]=[
    {
        Header:"CODE",
        TitleHeader:"Mã số",
        accessor:"Code"
    },
    {
        Header:"PRICE",
        TitleHeader:"Giá",
        accessor:"Price"
    },
    {
        Header:"DISCOUNT",
        TitleHeader:"Giảm giá",
        accessor:"Discount"
    },
    {
        Header:"DEPOSIT",
        TitleHeader:"Đặt cọc",
        accessor:"Deposit"
    },
    {
        Header:"ACTIVE",
        TitleHeader: "Hiệu lực",
        accessor: "Active",
    },
    {
        Header:"PATHURL",
        TitleHeader: "Ảnh",
        accessor: "PathUrl",
    },
    {
        Header:"CREATEDDATEUTC",
        TitleHeader: "Ngày tạo",
        accessor: "CreatedDateUtc",
    },
    {
        Header:"UPDATEDDATEUTC",
        TitleHeader: "Ngày cập nhật",
        accessor: "UpdatedDateUtc",
    },
    {
        Header:"ACTION",
        TitleHeader: "",
        accessor: "Id",
    }
]