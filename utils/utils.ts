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

export const convertStringToDate=(dateString:string):Date=>{
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

export const truncateString=(str: string, maxLength: number): string =>{
  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength) + '...';
}

export const convertNumberENtoNumber=(numberEN:string):number=>{
  if(isNullOrEmpty(numberEN))
    return 0;

  return parseFloat(numberEN.replace(/,/g, ''));
}

export const convertNumberStrENtoString=(numberEN:string):string=>{
  return numberEN.replace(/,/g, '');
}