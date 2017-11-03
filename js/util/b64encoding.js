const b64Encode = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(`0x` + p1);
      }));
};

const b64Decode = (str) => {
  return decodeURIComponent(atob(str).split(``).map(function (c) {
    return `%` + (`00` + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(``));
};

export {b64Encode, b64Decode};
