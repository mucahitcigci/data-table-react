import React from "react";

function useStoreData() {
  const getData = (key) => {
    const storedData = localStorage.getItem(key);
    return JSON.parse(storedData);
  };

  const setData = (data, key) => {
    const convertStringData = JSON.stringify(data);
    localStorage.setItem(key, convertStringData);
  };

  return {
    getData,
    setData,
  };
}

export default useStoreData;
