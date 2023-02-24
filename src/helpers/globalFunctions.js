function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export function updateUser(arr, modal, user) {
  arr = arr.map((item) =>
    item.uuid === modal.uuid ? (item = { ...item, ...user }) : item
  );
  return arr;
}

export function addUser(arr, user) {
  arr.push({ ...user, uuid: uuidv4() });
  return arr;
}
export async function imageUpload(e) {
  const file = e.target.files[0];
  let image = "";
  image = await getBase64(file);
  return image;
}

export const nameFilter = (arr = [], value) => {
  let newFilt = [];
  arr.forEach(function (item) {
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      if (item.name.toLowerCase().includes(element.name.toLowerCase())) {
        newFilt.push(item);
      }
    }
  });
  return newFilt;
};

export const genderFilter = (arr, value) => {
  let newArr = arr.filter((item) =>
    value === "" ? true : item.gender === value
  );
  return newArr;
};
export const minSalaryFilter = (arr, value) => {
  let newArr = arr.filter((item) => item.salary >= Number(value));
  return newArr;
};
export const maxSalaryFilter = (arr, value) => {
  let newArr = arr.filter((item) => item.salary <= Number(value));
  return newArr;
};
export const outOfUseFilter = (arr, value) => {
  let newArr = arr.filter((item) =>
    value === "" ? true : item.outOfUse.toString() === value
  );
  return newArr;
};
