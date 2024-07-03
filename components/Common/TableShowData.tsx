import React from 'react'

interface Props{
    thItems:string[],
    trItems:any[]
}

const TableShowData = ({thItems, trItems}:Props) => {
  return (
    <table className='table-fixed w-full text-left rtl:text-right'>
        <thead className='text-xs bg-gray-50'>
            <tr>
                {thItems.map((thItem, index) =>(
                    <th scope="col" className="px-6 py-3" key={index}>{thItem}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {trItems.map((trItem:any, index) =>(
                <tr className="bg-white border-b" key={index}>
                    {thItems.map((thItem, index) =>(
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={index}>{trItem[thItem]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TableShowData