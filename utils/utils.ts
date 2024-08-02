export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const isNullOrEmpty=(str: string | null | undefined): boolean =>{
  return str === null || str === undefined || str.trim().length === 0;
}
