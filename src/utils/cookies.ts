type Cookies = { [name in string]: string };

const getDefault = () =>
  typeof document !== "undefined" ? document.cookie : "";

export const parseCookies = (cookie: string = getDefault()): Cookies =>
  cookie
    .split(";")
    .map((tuple) => tuple.trim().split("="))
    .reduce((acc, [name, value]) => ({ ...acc, [name]: value }), {});

export const getCookie = (name: string) => parseCookies()[name];
