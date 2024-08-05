"use client"

import React from 'react'
import { BG_COLOR } from 'react-tailwindcss-datepicker/dist/constants';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
    children: React.ReactNode;
  }

const ToastProvider = ({ children }: ToastProviderProps) => {
    const contextClass = {
        success: "rounded-2xl border-green bg-[#F0F9FA] p-1.5",
        error: "text-red-600",
        info: "text-gray-600",
        warning: "text-orange-400",
        default: "text-indigo-600",
        dark: "text-white-600 font-gray-300",
      };

  return (
    <>
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " z-[10000] relative bg-zinc-300 flex p-1 top-[140px] min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "flex text-base font-med block p-3"}
        position="bottom-left"
        autoClose={3000}
      />

        {children}
    </>
  )
}

export default ToastProvider