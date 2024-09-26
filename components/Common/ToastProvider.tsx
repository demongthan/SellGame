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
        success: "text-green-400 border-green-400",
        error: "text-red-600 border-red-600",
        info: "text-gray-60 border-gray-600",
        warning: "text-orange-400 border-orange-600",
        default: "text-indigo-600 border-indigo-600",
        dark: "text-white-600 font-gray-300 border-gray-300",
      };

  return (
    <>
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " z-[10000] text-center relative flex p-1 top-[140px] min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white border rounded-xl shadow-lg font-semibold text-base"
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