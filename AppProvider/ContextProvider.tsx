"use client";

import React from 'react'
import GlobalProvider from './GlobalProvider';

interface Props {
    children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 250);
    }, []);

    if (!isReady) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

  return (
    <GlobalProvider>
        {children}
    </GlobalProvider>
  )
}

export default ContextProvider