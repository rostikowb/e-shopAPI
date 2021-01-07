import GoodsModel from '../../modules/CMR/models/GoodsModel';
import cliProgress from "cli-progress";

export const filterRestruct = async () => {

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);


  // const ctgrId = '11900213'
  const nameOld = 'Разъем 1';
  // const nameNew = 'Длина кабеля, м'

  const goods = await GoodsModel.find()
  let leng = goods.length;
  progressBar.start(leng, 0);

  while (leng--) {
    progressBar.update(leng);
    const oneGoods = goods[leng];
    let goodLeng = oneGoods.prm.length;

    while (goodLeng--) {
      const oneParam = oneGoods.prm[goodLeng];


      if (oneParam.name === 'Назначение') {
        if (oneParam.value === 'Для кабинета; Для дома;' || oneParam.value === 'Для кабинета;Для дома;' )oneParam.value = 'Для кабинета-Для дома'

      }
      if (oneParam.name === 'Особенности') {
        if (oneParam.value === 'Питание: USB' ) oneParam.value = 'Питание от USB'

      }
      await oneGoods.save()
      // if (oneParam.name === 'Место установки') {
      //   // oneGoods.prm.splice(goodLeng, 1)
      //
      //   let value = oneParam.value;
      //   if (value === 'Черный' ) oneParam.value = 'Чёрный'
      //
      //   await oneGoods.save()
      // }



      // if (oneParam.name === 'Цвет') {
      //   if(oneParam.value === 'Blue') oneParam.value = 'Голубой'
      //   if(oneParam.value === 'Brown') oneParam.value = 'Коричневый'
      //   if(oneParam.value === 'Dark-Coffee') oneParam.value = 'Темный-кофе'
      //   if(oneParam.value === 'Deep-Blue') oneParam.value = 'Синий'
      //   if(oneParam.value === 'Gray') oneParam.value = 'Серый'
      //   if(oneParam.value === 'Green') oneParam.value = 'Зеленый'
      //   if(oneParam.value === 'Khaki') oneParam.value = 'Хаки'
      //   if(oneParam.value === 'Orange') oneParam.value = 'Апельсин'
      //   if(oneParam.value === 'Violet') oneParam.value = 'Фиолетовый'
      //   if(oneParam.value === 'Yellow') oneParam.value = 'Желтый'
      //   await oneGoods.save()
      // }

      // if (oneParam.name === 'Тип подключения') {
      //   if (oneParam.value === 'Комбинированные ' ) oneParam.value = 'Комбинированные'
      // }
      // if (oneParam.name === 'Динамик') {
      //   oneGoods.prm.splice(goodLeng, 1)
      // }
      // if (oneParam.name === 'Тип крепления') {
      //   if (oneParam.value === 'Функция плеера' ) {
      //     const item = oneGoods.prm.find(item=>item.name === 'Функции и возможности')
      //     if(!item) oneGoods.prm.push({name: 'Функции и возможности', value: 'Функция плеера'})
      //     oneGoods.prm.splice(goodLeng, 1)
      //   }
      // }

      // await oneGoods.save()
      // if (name === 'Мощность' || name === 'Выходной ток' ) {
      // oneGoods.prm[goodLeng].name = 'Выходная сила тока, А'

      // if (oneParam.name === 'Длина шнура, м' || oneParam.name === 'Длина шнура' || oneParam.name === 'Длина кабеля, м') {
      //   oneParam.name = 'Длина кабеля, м'
      //   oneParam.value = oneParam.value.match(/[0-9]*[.,]?[0-9]+/)[0]
      //   oneParam.value = oneParam.value.replace(/,/, '.')
      //   oneParam.value = `${oneParam.value} м`;
      //
      // }
      // if (oneParam.name === 'Инпеданс, Ом' || oneParam.name === 'Сопротивление наушников') {
      //   oneParam.name = 'Сопротивление, Ом'
      //   oneParam.value = oneParam.value.match(/[0-9]*[.,]?[0-9]+/)[0]
      //   oneParam.value = oneParam.value.replace(/,/, '.')
      //   oneParam.value = `${oneParam.value} Ом`;
      //
      // }

      // if (oneParam.name === 'Выходная мощность' || oneParam.name === 'Мощность, Вт') {
      //   oneParam.name = 'Мощность, Вт'
      //   const num = oneParam.value.match(/\d+/)[0];
      //   oneParam.value = `${num} Вт`
      //   await oneGoods.save()
      // }


    }

  }
  progressBar.stop();
  console.log(goods.length);

}

// const keyReName = () => {
//
//
// }


