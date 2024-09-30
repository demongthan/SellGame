"use client"

import { useState } from 'react';
import Image from 'next/image'

interface Props{
    src: string,
    className?:string
}

const ImageModal = ({src, className}:Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <Image alt='' src={src} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} className={`cursor-pointer ${className}`} onClick={() => setIsOpen(true)}></Image>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative">
                        <Image
                            src={src}
                            alt={""}
                            width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}
                            className="max-w-full max-h-screen object-contain py-36"
                        ></Image>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageModal;