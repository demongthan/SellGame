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
        success: "bg-green-400",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
      };

  return (
    <>
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " z-[10000] relative flex p-1 top-[140px] min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "flex text-base font-med block p-3"}
        position="bottom-left"
        autoClose={1000}
      />

        {children}
    </>
  )
}

export default ToastProvider