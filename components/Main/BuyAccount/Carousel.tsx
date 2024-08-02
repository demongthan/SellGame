import { useRouter } from 'next/router';
import React from 'react'
import useKeypress from "react-use-keypress";
import Image from "next/image";
import { useLastViewedPhoto } from '@/utils/function/useLastViewedPhoto';

export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

interface Props{
    index: number;
    currentPhoto: ImageProps;
}

const Carousel = ({index, currentPhoto}:Props) => {
    const router = useRouter();
    const [, setLastViewedPhoto] = useLastViewedPhoto();

    function closeModal() {
        setLastViewedPhoto(currentPhoto.id?currentPhoto.id:null);
        router.push("/", undefined, { shallow: true });
    }

    function changePhotoId(newVal: number) {
        return newVal;
    }

    useKeypress("Escape", () => {
        closeModal();
    });
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        <Image
          src={currentPhoto.blurDataUrl}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        />
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}

export default Carousel