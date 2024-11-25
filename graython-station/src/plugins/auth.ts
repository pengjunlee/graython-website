import cookies from "js-cookie";

const tokenKey = "gray_access_token";

export function getToken() {
  return cookies.get(tokenKey);
}

export function setToken(token: string) {
  return cookies.set(tokenKey, token);
}

export function removeToken() {
  return cookies.remove(tokenKey);
}
