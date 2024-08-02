"use client"

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react'

interface Props{
    isBlockLabel?:boolean,
    label?:string |null,
    classLabel?:string,
    classDiv?:string,
    data:any,
    name?:string
}

const SelectUI = ({
  isBlockLabel=true, 
  label="", 
  classLabel="", 
  classDiv="", 
  data,
  name
  }:Props) => {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<any>({Name:""});

    const filteredItem =
    query === ""
      ? data
      : data?.filter((item:ValueKey) =>
          item.Name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={classDiv}>
        {label && (<label htmlFor={name} className={`${isBlockLabel?"block pb-2":"inline-block pr-3"} text-base text-black font-semibold leading-6 ${classLabel}`}>{label}</label>)}

         <Combobox value={selected} onChange={(event)=>setSelected(event)}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden bg-white text-left">
              <ComboboxInput name={name}
                className="w-full border-s2gray2 border rounded-lg py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:border-s2cyan1 focus:outline-none"
                displayValue={(item:any) => item.Name}
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
              <ComboboxOption className="absolute mt-1 max-h-[4.2rem] z-50 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" value={undefined}>
                {filteredItem.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredItem.map((item:any, index:any) => (
                    <ComboboxOption
                      key={index}
                      className={`relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900`}
                      value={item}
                    >
                      {({ selected}) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
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

export default SelectUI