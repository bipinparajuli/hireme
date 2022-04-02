import jwtDecode from 'jwt-decode';

export const persistSession = (token) => localStorage.setItem('authentication-token-user',JSON.stringify(token));


export const deleteSession = () => localStorage.removeItem('authentication-token-user');

export const getSession = () =>localStorage.getItem('authentication-token-user');


export const hasToken = () => {
  const authToken = getSession();
  JSON.parse(authToken)
  if (authToken && authToken !== '') {
    try {
      const decodedToken = authToken.token ? jwtDecode(authToken.token) : false;
      const currentTimestamp = new Date().getTime();
      const tokenExpTime = decodedToken.exp * 1000;
      if(currentTimestamp > tokenExpTime) {
        deleteSession();
      }
console.log("Returning true");
  return true
    } catch (err) {

      return false;
    }
  }
  return false;
};

export const getUserData = () => {
  const authToken = getSession();
  JSON.parse(authToken);
  // console.log(authToken);

  if (authToken && authToken !== '') {
    try {
      return JSON.parse(authToken).user;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
}

