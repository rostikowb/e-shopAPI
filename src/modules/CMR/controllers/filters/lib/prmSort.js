const sort = (arr) => {
  try {
    const number = /[0-9]*[.,]?[0-9]+/.test(arr[0])

    if (number) {
      return arr.sort((a, b) => {
        return a.match(/[0-9]*[.,]?[0-9]+/)[0] - b.match(/[0-9]*[.,]?[0-9]+/)[0]
      })
    } else {
      return arr.sort();
    }
  } catch (e) {
    return arr.sort();
  }
}

export const prmSort = (obj) => {

  for (const ctgr in obj) {
    const prmObj = obj[ctgr].prm;
    for (const prm in prmObj) {
      const onePrmArr = prmObj[prm];

      prmObj[prm] = sort(onePrmArr);
    }
  }
  return obj;
}