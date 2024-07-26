"use client"

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react'

interface Props{
    value:string|undefined,
    isBlockLabel:boolean,
    label:string |null,
    classLabel?:string,
    classDiv?:string,
    data:ValueKey[],
    selected:string,
    setSelected:any
}

const SelectUI = ({value=undefined, 
  isBlockLabel, 
  label="", 
  classLabel="", 
  classDiv="", 
  data,
  selected,
  setSelected
  }:Props) => {
    const [query, setQuery] = useState("");

    const filteredItem =
    query === ""
      ? data
      : data.filter((item:ValueKey) =>
          item.Name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={classDiv}>
        {label && (<label className={`${isBlockLabel?"block pb-2":"inline-block pr-3"} text-base text-black font-semibold leading-6 ${classLabel}`}>{label}</label>)}

         <Combobox value={selected} onChange={setSelected}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden bg-white text-left">
              <Combobox.Input
                className="w-full border-s2gray2 border rounded-lg py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:border-s2cyan1 focus:outline-none"
                displayValue={(item:ValueKey) => item.Name}
                onChange={(event) => setQuery(event.target.value)}
              >
              </Combobox.Input>

              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400 hover:text-gray-500"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredItem.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredItem.map((item:ValueKey) => (
                    <Combobox.Option
                      key={item.Key}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
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
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
         </Combobox>
    </div>
  )
}

export default SelectUI