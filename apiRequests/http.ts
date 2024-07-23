import envConfig from '@/config'
import { normalizePath } from '@/utils/utils'
import { access } from 'fs'
import { redirect } from 'next/navigation'

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
}
  
const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
    status: number
    payload: {
      message: string
      [key: string]: any
    }
    constructor({ status, payload }: { status: number; payload: any }) {
      super('Http Error')
      this.status = status
      this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: 422
    payload: EntityErrorPayload
    constructor({
        status,
        payload
    }: {
        status: 422
        payload: EntityErrorPayload
    }) {
        super({ status, payload })
        this.status = status
        this.payload = payload
    }
}

const request = async <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, isAuth:boolean, options?: CustomOptions | undefined) => {
    let body: FormData | string | undefined = undefined;

    if (options?.body instanceof FormData) {
        body = options.body
    } 
    else if (options?.body) {
        body = JSON.stringify(options.body)
    }

    const baseHeaders: {[key: string]: string} =
        body instanceof FormData
        ? {}
        : {
            'Content-Type': 'application/json'
        }
  
    const baseUrl =envConfig.NEXT_PUBLIC_API_ENDPOINT;

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    if(isAuth){
      const response=await fetch('/api/auth',{
          method: 'GET'
      })

      await response.json().then(response=>{
        baseHeaders.Authorization = `Bearer ${response.data}`;
      });
    }

    console.log(baseUrl, fullUrl)

    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers
      } as any,
      body,
      method
    })

    const payload: T = await res.json()
    const data = {
        status: res.status,
        payload
    }

    return data;
}

const http = {
    get<Response>(url: string, isAuth:boolean, options?: Omit<CustomOptions, 'body'> | undefined) {
      return request<Response>('GET', url, isAuth, options)
    },
    
    post<Response>(url: string, isAuth:boolean, body: any,options?: Omit<CustomOptions, 'body'> | undefined) {
      return request<Response>('POST', url, isAuth, { ...options, body })
    },

    put<Response>(url: string, isAuth:boolean, body: any,options?: Omit<CustomOptions, 'body'> | undefined) {
      return request<Response>('PUT', url, isAuth, { ...options, body })
    },

    delete<Response>(url: string, isAuth:boolean, options?: Omit<CustomOptions, 'body'> | undefined) {
      return request<Response>('DELETE', url, isAuth, { ...options })
    }
  }

  export default http