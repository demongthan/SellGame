import React from 'react'

interface Props{
    thItems:string[],
    trItems:any[]
}

const TableShowData = ({thItems, trItems}:Props) => {
  return (
    <table className='table-fixed'>
        <thead>
            {thItems.map((thItem, index) =>(
                <th key={index}>{thItem}</th>
            ))}
            <tr></tr>
        </thead>
        <tbody>
            {trItems.map((trItem:any, index) =>(
                <tr key={index}>
                    {thItems.map((thItem, index) =>(
                        <td key={index}>{trItem[thItem]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TableShowData