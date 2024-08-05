import { HeaderItem } from "./types";

export const adminImageDetailTable:HeaderItem[]=[
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