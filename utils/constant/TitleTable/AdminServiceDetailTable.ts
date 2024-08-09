import { HeaderItem } from "./types";

export const adminServiceDetailTable:HeaderItem[]=[
    {
        Header:"NAME",
        TitleHeader:"Tên",
        accessor:"Name"
    },
    {
        Header:"TRANSACTION",
        TitleHeader:"Giao dịch",
        accessor:"Transaction"
    },
    {
        Header:"METHOD",
        TitleHeader:"Phương thức",
        accessor:"Method"
    },
    {
        Header:"UNITPRICE",
        TitleHeader:"Đơn giá",
        accessor:"UnitPrice"
    },
    {
        Header:"UNIT",
        TitleHeader:"Đơn vị",
        accessor:"Unit"
    },
    {
        Header:"RATING",
        TitleHeader:"Đánh giá",
        accessor:"Rating"
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