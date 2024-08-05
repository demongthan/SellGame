"use client"

import { Input } from "@headlessui/react";
import { ChangeEventHandler, useState } from "react";

type Props = {
    id?: string
    className?: string
    color?: string,
    disabled?: boolean,
    isChecked: boolean,
    classDiv?: string,
    label?:string,
    name?: string,
    isBlockLabel?: boolean,
    classLabel?: string,
    onChangeEvent?:ChangeEventHandler<HTMLInputElement> | undefined,
  }
  
  const CheckboxUI = (props: Props) => {
    const { id, className, color, disabled, isChecked, classDiv, label, name, isBlockLabel=true, classLabel, onChangeEvent } = props;

    return (
      <div className={`${classDiv} flex justify-items-start items-center`}>
        {label && (<label htmlFor={name} className={`${isBlockLabel?"block":"inline-block"} text-base text-black font-semibold leading-6 pb-2 ${classLabel}`}>{label}</label>)}

        <Input
          onChange={onChangeEvent}
          id={id}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className={`defaultCheckbox -mt-1 relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
          justify-center rounded-md border border-gray-300 text-white outline-none transition duration-[0.2s]
          checked:border-none checked:text-white hover:cursor-pointer ${color === "red"
              ? "checked:border-none checked:bg-red-500"
              : color === "blue"
                ? "checked:border-none checked:bg-blue-500"
                : color === "green"
                  ? "checked:border-none checked:bg-green-500 "
                  : color === "yellow"
                    ? "checked:border-none checked:bg-yellow-500"
                    : color === "orange"
                      ? "checked:border-none checked:bg-orange-500"
                      : color === "teal"
                        ? "checked:border-none checked:bg-teal-500"
                        : color === "navy"
                          ? "checked:border-none checked:bg-navy-500"
                          : color === "lime"
                            ? "checked:border-none checked:bg-lime-500"
                            : color === "cyan"
                              ? "checked:border-none checked:bg-cyan-500"
                              : color === "pink"
                                ? "checked:border-none checked:bg-pink-500 "
                                : color === "purple"
                                  ? "checked:border-none checked:bg-purple-500"
                                  : color === "amber"
                                    ? "checked:border-none checked:bg-amber-500"
                                    : color === "indigo"
                                      ? "checked:border-none checked:bg-indigo-500"
                                      : color === "gray"
                                        ? "checked:border-none checked:bg-gray-500"
                                        : "checked:bg-brand-500 dark:checked:bg-brand-400"
            } ${className}`}
          name={name}
        />
      </div>
    );
  };
  
  export default CheckboxUI;  