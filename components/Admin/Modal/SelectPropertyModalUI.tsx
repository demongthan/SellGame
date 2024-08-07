import { LoadingUI } from '@/components'
import React, { useState } from 'react'

const SelectPropertyModalUI = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    return (
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    
                )}
            </div>
    )
}

export default SelectPropertyModalUI