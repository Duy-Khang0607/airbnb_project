export const configs = {
  setStore: (name: string, value: any) => {
    localStorage.setItem(name, value);
  },
  getStore: (name: string) => {
    return localStorage.getItem(name);
  },

  setStoreJSON: (name: string, values: any) => {
    //convert to string
    values = JSON.stringify(values);
    //save to local storage
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name: string) => {
    if (localStorage.getItem(name)) {
      let value: any = localStorage.getItem(name);
      //convert to JSON object
      let content = JSON.parse(value);
      return content;
    }
    return null;
  },
  setCookie: (value: string, days: number, name: string) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  clearCookie: (name: string) => {
    setCookie("", -1, name);
  },
  clearLocalStorage: (name: string) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
};



export const {
  ACCESS_TOKEN,
  USER_LOGIN,
  getCookie,
  setCookie,
  getStore,
  setStore,
  getStoreJSON,
  setStoreJSON,
  clearCookie,
  clearLocalStorage,
} = configs;

