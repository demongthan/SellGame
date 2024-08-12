import { HeaderItem } from "./types";

export const adminCategoryTable:HeaderItem[]=[
    {
        Header:"NAME",
        TitleHeader:"Danh mục",
        accessor:"Name"
    },
    {
        Header:"CODE",
        TitleHeader:"Mã số",
        accessor:"Code"
    },
    {
        Header:"DESCRIPTION",
        TitleHeader:"Mô tả",
        accessor:"Description"
    },
    {
        Header:"TOTAL",
        TitleHeader:"Số lượng",
        accessor:"Total"
    },
    {
        Header:"TOTALSALE",
        TitleHeader:"Số lượng đã bán",
        accessor:"TotalSale"
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