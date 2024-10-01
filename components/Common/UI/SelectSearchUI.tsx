"use client"

import { ItemSelect } from '@/utils/types/SelectItem';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { ChangeEventHandler, Fragment, useState } from 'react'

interface Props{
    label?:string |null,
    classLabel?:string,
    classDiv?:string,
    data:any,
    name?:string,
    classSelect?:string,
    selected?:any,
    onChangeEvent?:ChangeEventHandler<HTMLInputElement> | undefined,
}

const SelectSearchUI = ({
        label="", 
        classLabel="", 
        classDiv="", 
        data,
        name,
        classSelect,
        selected,
        onChangeEvent
    }:Props) => {
    const [query, setQuery] = useState<any>("");

    const filteredItem = query === ""
    ? data
    : data?.filter((item:ItemSelect) =>
        item.Name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    );

    return (
        <div className={`flex flex-row ${classDiv} border border-slate-300 rounded-lg h-12 shadow-xl`}>
            <label htmlFor={name} className={`bg-lime-50 rounded-l-lg border-r border-slate-300 h-full text-base text-coolGray-500 font-semibold leading-6 ${classLabel} flex justify-start items-center pl-2`}>{label}</label>

            <Combobox value={selected} onChange={onChangeEvent}>
                <div className={`relative ${classSelect}`}>
                    <div className="flex w-full rounded-r-lg px-2 h-full cursor-default overflow-hidden bg-white text-left">
                        <ComboboxInput name={name}
                            className="w-full text-slate-500 font-normal text-sm leading-5 focus:outline-none"
                            displayValue={(item:any) => item?item.Name:""}
                            onChange={(event) => setQuery(event.target.value)}
                        >
                        </ComboboxInput>

                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400 hover:text-gray-500"
                            aria-hidden="true"
                            />
                        </ComboboxButton>
                    </div>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <ComboboxOption className="absolute mt-1 max-h-[10rem] z-50 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" value={undefined}>
                            {filteredItem.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                            ) : (
                            filteredItem.map((item:any, index:any) => (
                                <ComboboxOption
                                key={index}
                                className={`relative cursor-default select-none py-2 pl-10 pr-4`}
                                value={item}
                                >
                                {({ selected}) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? "font-medium text-slate-500" : "font-normal text-gray-600"
                                        }`}
                                    >
                                        {item.Name}
                                    </span>
                                    {selected ? (
                                        <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600`}
                                        >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </ComboboxOption>
                            ))
                            )}
                        </ComboboxOption>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SelectSearchUI