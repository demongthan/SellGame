import moment from 'moment-timezone';

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const isNullOrEmpty=(str: string | null | undefined): boolean =>{
  return str === null || str === undefined || str.trim().length === 0;
}

export const displayDateTime=(date:Date):string=>{
  if(date==null) return ''

  return moment.utc(date.toLocaleString()).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss');
}