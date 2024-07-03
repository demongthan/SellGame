import React from 'react'

interface Props{
    className?:string
    title:string
}

const ButtonV1UI = ({title, className}:Props) => {
  return (
    <button className={`${className} bg-s2cyan1 text-white h-[2.5rem] border border-transparent rounded-md px-4 hover:opacity-70`}>{title}</button>
  )
}

export default ButtonV1UI