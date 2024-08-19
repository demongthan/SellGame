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

export const generateThreeDigitNumber=(): number =>{
  return Math.floor(Math.random() * 900) + 100;
}

export const generateRandomUppercaseString=(length: number): string =>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;
}
