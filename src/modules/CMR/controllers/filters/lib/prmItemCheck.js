export const prmItemCheck = (prmArr, itemPrm) => {

  // Если параметры товара пусты то возвращаем пустой масив
  if (!itemPrm && !itemPrm.length) return [];

  itemPrm.forEach(itemPrm => {

    // Если в нашем ОБЩЕМ масиве параметров нет параметра товара то добавляем его имя как ключ обекта
    // В значении записываем масив
    // И в него же первым элементом значение параметра
    if (!prmArr[itemPrm.name] || !prmArr[itemPrm.name]?.length) {
      prmArr[itemPrm.name] = [itemPrm.value]
    } else {

      // Если масив значений конкретного параметра не пуст то добавляем ему новое значение
      prmArr[itemPrm.name] = Array.from(new Set([...prmArr[itemPrm.name], itemPrm.value]))
    }
  })

  return prmArr;
}