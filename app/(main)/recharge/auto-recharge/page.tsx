"use client"

import { transactionHistoryCardApiRequest } from '@/apiRequests/transaction-history-card'
import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider'
import { ButtonV1UI, InputUI, LoadingUI, SelectUI, TableShowData, TitleRecharge } from '@/components'
import { cardTypeSelect } from '@/utils/constant/CardTypeSelect'
import { faceValueCardSelect } from '@/utils/constant/FaceValueCardSelect'
import { showToast } from '@/utils/showToast'
import { ItemSelect } from '@/utils/types/SelectItem'
import { generateThreeDigitNumber, isNullOrEmpty } from '@/utils/utils'
import { Button, Input } from '@headlessui/react'
import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import React, { FormEvent, useEffect, useState } from 'react'

const AutoRecharge = () => {
  const [cardType, setCardType] = useState<ItemSelect>(cardTypeSelect[0]);
  const [valueCardType, setValueCardType] = useState<ItemSelect>(faceValueCardSelect[0]);
  const [cardNumber, setCardNumber]=useState<string>("");
  const [serialNumber, setSerialNumber]=useState<string>("");
  const [securityCode, setSecurityCode]=useState<string>("");
  const [autoSecurityCode, setAutoSecurityCode]=useState<string>(generateThreeDigitNumber().toString())
  const [errAction, setErrAction] = useState<string |null>(null);

  const [errArr, setErrArr]=useState<ErrorValidate[]>();
  const {userDisplay}=useGlobalState() as GlobalContextProps;
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setIsLoading(true);
    setErrArr([]);

    try{
      const formData = new FormData(event.currentTarget)

      const response = await fetch('/api/recharge/auto-recharge', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json();

      setIsLoading(false);

      if(data.isSuccess){
        const result = await transactionHistoryCardApiRequest.createTransactionHistoryCard({idUser:userDisplay?.id, body:data.data});

        if(result.payload.data){
          showToast("success", <p>{result.payload.message}</p>);
          
          setCardType(cardTypeSelect[0]);
          setValueCardType(faceValueCardSelect[0]);
          setCardNumber("");
          setSerialNumber("");
          setSecurityCode("");
          setAutoSecurityCode(generateThreeDigitNumber().toString());
        }
        else{
          showToast("error", <p>{result.payload.message}</p>);
        }
        setIsLoading(false);
      }
      else{
        if(data.data){
          const errorArr: ErrorValidate[] =data.data.map(({...item})=>({
            for:item.for,
            message: item.message
          }))

          setErrArr(errorArr);
        }

        setErrAction(data.message);
        setIsLoading(false);
      }
    }
    catch(error){
      console.log(error);
      showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [setIsLoading])

  const handleChange = (name:string) => (e: any) => {
    switch (name) {
        case "cardType":
          setCardType(e);
          break;
        case "valueCardType":
          setValueCardType(e);
          break;
        case "cardNumber":
          if (/^\d*\.?\d*$/.test(e.target.value)) {
            setCardNumber(e.target.value);
          }
          break;
        case "serialNumber":
          if (/^\d*\.?\d*$/.test(e.target.value)) {
            setSerialNumber(e.target.value);
          }
          break;
        case "securityCode":
          if (/^\d*\.?\d*$/.test(e.target.value)) {
            setSecurityCode(e.target.value);
          }
          break;
        default:
          break;
    }
  }

  const handleBlur =(e:any)=>{
    if(isNullOrEmpty(e.target.value)){
      setSecurityCode("000");
    }
  }

  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Nạp thẻ tự động'}></TitleRecharge>

        <form className='flex flex-col items-center gap-5' onSubmit={onSubmit}>
          {isLoading?(<div className='h-[85vh]'><LoadingUI></LoadingUI></div>):
          (
            <>
              <SelectUI selected={cardType} name={"CardType"} data={cardTypeSelect} isBlockLabel={false} label={"Loại thẻ:"} classDiv='w-3/5'
              classLabel='w-1/5' classSelect='w-4/5' onChangeEvent={handleChange("cardType")}></SelectUI>
    
              <SelectUI selected={valueCardType} name={"ValueCardType"} data={faceValueCardSelect} isBlockLabel={false} label={"Mệnh giá:"} classDiv='w-3/5'
              classLabel='w-1/5' classSelect='w-4/5' onChangeEvent={handleChange("valueCardType")}></SelectUI>
    
              <InputUI value={cardNumber} name='CardNumber' isBlockLabel={false} label={"Mã số thẻ:"} classDiv={"w-3/5"}
              classLabel={"w-1/5"} classInput={"w-4/5"} onChangeEvent={handleChange("cardNumber")}
              errArr={errArr?.filter((error)=>error.for==="cardNumber")}></InputUI>
    
              <InputUI value={serialNumber} name='SerialNumber' isBlockLabel={false} label={"Số serial:"}
              classDiv={"w-3/5"} classLabel={"w-1/5"} classInput={"w-4/5"} onChangeEvent={handleChange("serialNumber")}
              errArr={errArr?.filter((error)=>error.for==="serialNumber")}></InputUI>
    
              <div className='flex flex-row w-3/5 gap-3'>
                  <InputUI value={securityCode} name='SecurityCode' isBlockLabel={false} label={"Mã bảo vệ:"} max={3}
                  classDiv={"w-4/5"} classLabel={"w-1/4"} classInput={"w-3/4"} onChangeEvent={handleChange("securityCode")} onBlurEvent={handleBlur}
                  errArr={errArr?.filter((error)=>error.for==="securityCode")}></InputUI>
    
                  <Input readOnly={true} value={autoSecurityCode} name="AutoSecurityCode"
                  className={"w-[15%] flex justify-center h-9 px-auto outline-none text-red-500 text-xl italic font-semibold pl-[2rem]"}></Input>
    
                  <Button className='flex justify-center items-center -mt-2 w-[5%]'
                  onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                    event.preventDefault();
                    setAutoSecurityCode(generateThreeDigitNumber().toString());
                  }}><ArrowPathIcon className='w-[1.5rem] h-[1.5rem] text-black'></ArrowPathIcon></Button>
              </div>

              {errAction && (<p className='text-lg text-center text-red-500'>
                  <ExclamationTriangleIcon className='h-[1.5rem] w-[1.5rem] inline-block'></ExclamationTriangleIcon>
                  {errAction}
              </p>)}

              <ButtonV1UI title={'Nạp thẻ'} className={"w-3/5 h-9"}></ButtonV1UI>
            </>
          )}
        </form>
    </div>
  )
}

export default AutoRecharge