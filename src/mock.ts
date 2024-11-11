import { CarItem } from '@/types'

export const autoMock: CarItem[] = [
  {
    images: ['lancer.jpg'],
    brand: 'Mitsubishi',
    model: 'Lancer',
    color: 'black',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 1.5,
    drive: {
      type: 'FWD',
      name: 'Передний',
    },
    enginePower: 110,
    transmission: {
      type: 'CVT',
      name: 'Вариатор',
    },
    leftHandDrive: true,
    year: 2012,
    mileage: 67000,
    price: '650000',
    descr:
      'Автомобиль в хоpoшем состоянии. Kузов pодном окpасe. Oригинaльнoe лoбoвое стекло, бeз трещин. ДТП нe былo. Poднoй прoбег. Kузов веcь в рoднe, кpoме бампеpов(коcметичeский oкраc), присутствуют скoлы и цaрапины не глубoкиe. Bcе стеклa завoдcкиe. Aрки и поpоги отлично. Есть фото днища. Передняя и задняя оптика тюнинг, смотрится отлично (есть родные фары и фонари для постановки на учет) Салон чистый, сиденье не порваны. Есть чехлы накидки, отдам с машиной. Большая андройд магнитола 10 дюймов, подключена к рулю. Камера заднего хода. По технике ни каких проблем, новое масло и фильтра, кпп включается без посторонних звуков, новые задние тормозные диски и все колодки, расход бензина очень маленький. Новая летняя резина. ТОРГ ВОЗЛЕ АВТОМОБИЛЯ.',
    guid: '1e785cd8-d03a-42ee-b500-de028f3a6a6e',
    author: {
      name: 'xxx345345xx',
      avatar: '',
      phone: '8 (921) 222 00 32',
      location: 'Мурманск',
    },
  },
  {
    images: ['sportage.jpg'],
    brand: 'Kia',
    model: 'Sportage',
    color: 'silver',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 2,
    drive: {
      type: 'FWD',
      name: 'Передний',
    },
    enginePower: 150,
    transmission: {
      type: 'MT',
      name: 'Механика',
    },
    leftHandDrive: true,
    year: 2015,
    mileage: 154000,
    price: '1760000',
    descr: 'Мотор откапитален, перекупы лесом. Передний привод и палка',
    guid: '8c905b7c-6a89-45b5-9f21-70e9f4d56d36',
    author: {
      name: 'Леонид',
      avatar: '',
      phone: '8 (950) 101 90 46',
      location: 'Москва',
    },
  },
  {
    images: ['jeep.jpg'],
    brand: 'Jeep',
    model: 'Grand Cherokee',
    color: 'gray',
    engineType: {
      type: 'diesel',
      name: 'Дизель',
    },
    engineCapacity: 3,
    drive: {
      type: 'AWD',
      name: 'Полный',
    },
    enginePower: 230,
    transmission: {
      type: 'AT',
      name: 'Автомат',
    },
    leftHandDrive: true,
    year: 2009,
    mileage: 112000,
    price: '2349000',
    descr: 'Настоящий жип, конский налог, покупайте',
    guid: '163426d9-fd4c-4551-8ae7-b9bb5743a315',
    author: {
      name: 'чудик228',
      avatar: '',
      phone: '8 (921) 123 45 67',
      location: 'Москва',
    },
  },
  {
    images: ['bmw.jpg'],
    brand: 'BMW',
    model: 'E34',
    color: 'green',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 2.5,
    drive: {
      type: 'RWD',
      name: 'Задний',
    },
    enginePower: 170,
    transmission: {
      type: 'MT',
      name: 'Механика',
    },
    leftHandDrive: true,
    year: 1991,
    mileage: 389000,
    price: '555000',
    descr: 'Кеку кек',
    guid: '8c905b7c-6a89-45b5-9f21-70e9f4d56d39',
    author: {
      name: 'ровный поц',
      avatar: '',
      phone: '8 (921) 123 45 67',
      location: 'Москва',
    },
  },
  {
    images: ['lada1.jpg', 'lada2.webp'],
    brand: 'Lada',
    model: 'Granta',
    color: 'white',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 1.6,
    drive: {
      type: 'FWD',
      name: 'Передний',
    },
    enginePower: 85,
    transmission: {
      type: 'MT',
      name: 'Механика',
    },
    leftHandDrive: true,
    year: 2013,
    mileage: 235785,
    price: '420000',
    descr: 'Лада и лада',
    guid: '8c905b7c-6a29-45b5-9f21-70e9f4d56d36',
    author: {
      name: 'xxx345345xx',
      avatar: '',
      phone: '8 (921) 123 45 67',
      location: 'Воронеж',
    },
  },
  {
    images: ['glk.jpg'],
    brand: 'Mercedes-Benz',
    model: 'GLK',
    color: 'white',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 3,
    drive: {
      type: 'AWD',
      name: 'Полный',
    },
    enginePower: 231,
    transmission: {
      type: 'AT',
      name: 'Автомат',
    },
    leftHandDrive: true,
    year: 2014,
    mileage: 123485,
    price: '1950000',
    descr:
      'Автомобиль является самым лучшим в своём класс. Надёжный городской кроссовер. Отличная проходимость и отменная управляемость. Подтверждённый пробег. Полный комплект ключей и документов. Ещё много текста для теста ограничения строк. Свечи поменял, цепь, масло в коробке. Резина новая',
    guid: '8c225b7c-6a29-45b5-9f21-70e9f4d56d36',
    author: {
      name: 'анатолий',
      avatar: '',
      phone: '8 (921) 765 33 11',
      location: 'Липецк',
    },
  },
  {
    images: [
      'audi1.jpg',
      'audi2.jpg',
      'audi3.jpg',
      'audi4.jpg',
      'audi5.jpg',
      'audi6.jpg',
      'audi7.jpg',
      'audi8.jpg',
      'audi1.jpg',
      'audi2.jpg',
      'audi3.jpg',
      'audi4.jpg',
      'audi5.jpg',
      'audi6.jpg',
      'audi7.jpg',
      'audi8.jpg',
      'audi1.jpg',
      'audi2.jpg',
      'audi3.jpg',
      'audi4.jpg',
      'audi5.jpg',
      'audi6.jpg',
      'audi7.jpg',
      'audi8.jpg',
    ],
    brand: 'Audi',
    model: 'Q3',
    color: 'black',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 2,
    drive: {
      type: 'AWD',
      name: 'Полный',
    },
    enginePower: 170,
    transmission: {
      type: 'AMT',
      name: 'Робот',
    },
    leftHandDrive: true,
    year: 2013,
    mileage: 242343,
    price: '1350000',
    descr: 'Новая турбина. Два комплекта колёс. Перекупы лесом. Торга нет',
    guid: '8c905b7c-6a29-45b5-9f21-70e9g1d56d36',
    author: {
      name: 'властелиц колец',
      avatar: '',
      phone: '8 (921) 567 87 62',
      location: 'Кировск',
    },
  },
  {
    images: ['rio.webp'],
    brand: 'Kia',
    model: 'Rio',
    color: 'green',
    engineType: {
      type: 'gas',
      name: 'Бензин',
    },
    engineCapacity: 1.6,
    drive: {
      type: 'FWD',
      name: 'Передний',
    },
    enginePower: 126,
    transmission: {
      type: 'MT',
      name: 'Механика',
    },
    leftHandDrive: true,
    year: 2012,
    mileage: 278476,
    price: '724000',
    descr: 'В такси была, битая, немного ржавая',
    guid: '8c905b7c-6a89-45b5-9f21-34e9f4d56d16',
    author: {
      name: 'xxx345345xx',
      avatar: '',
      phone: '8 (921) 123 45 67',
      location: 'Москва',
    },
  },
]
