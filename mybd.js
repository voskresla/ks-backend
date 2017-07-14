let typesOptions = {
  BT: [
    { text: 'Стиральная машина', value: 'WM' },
    { text: 'Посудомоечная машина', value: 'DM' },
    { text: 'Холодильник', value: 'H' },
    { text: 'Электрическая плита', value: 'Подключ. Эл.плиты(стандарт)' },
    { text: 'Электрическая панель', value: 'EP' },
    { text: 'Духовой Шкаф (независимый)', value: 'O' },
    { text: 'Духовой шкаф и Электрическая панель (зависимые)', value: 'OEPA' },
    { text: 'Вытяжка', value: 'V' },
    { text: 'Водонагреватель', value: 'W' }
  ],
  COND: [
    { text: 'Установка', value: 'COND_SETUP' },
    { text: 'Демонтаж', value: 'COND_REMOVE' },
    { text: 'Обслуживание', value: 'COND_SERVICE' }
  ],
  TV: [
    { text: 'Установка ТВ на тумбу', value: 'TV_SETUP' },
    { text: 'Установка ТВ на подвес', value: 'TV_WALL' },
    { text: 'Установка домашенго кинотеатра на тумбу', value: 'TV_HOME_SETUP' },
    { text: 'Установка домашенго кинотеатра на подвес', value: 'TV_HOME_WALL' },
    { text: 'Доработка SMART+', value: 'SMART' }
  ],
  SAT: [
    { text: 'Тестирование спутникового сигнала', value: 'SAT_TEST' },
    { text: 'Подключение спутниковой тарелки', value: 'SAT_SETUP' }
  ],
  C: [
    { text: 'Подключение роутера', value: 'C_ROUTE' },
    { text: 'Подключение переферийного устройства', value: 'C_HARDWARE' },
    { text: 'Настройка и оптимизация', value: 'С_SERVICE' },
    { text: 'Установка операционной системы', value: 'С_OS' }
  ]
}

let premiumOptions = {
  WM: [
    { text: 'Стандарт', value: 'WM_BASIC' },
    { text: 'Премиум', value: 'WM_VIP' },
    { text: 'Доработки', value: 'WMB_BASIC' },
  ],
  DM: [
    { text: 'Стандарт', value: 'DM_BASIC' },
    { text: 'Премиум', value: 'DM_VIP' },
    { text: 'Доработки', value: 'DM_ADD' },
  ]
}

let propertyOptions = {
  WM_BASIC: [
    { text: 'Встроенная', value: 'WMB_BASIC' },
    { text: 'Соло', value: 'WMS_BASIC' }
  ],
  WM_VIP: [
    { text: 'Встроенная', value: 'WMB' },
    { text: 'Соло', value: 'WMS' }
  ],
  DM_BASIC: [
    { text: 'Встроенная', value: 'ВMB' },
    { text: 'Соло', value: 'ВMS' }
  ],
  H: [
    { text: 'Встроенный', value: 'HB' },
    { text: 'Соло', value: 'HS' },
    { text: 'Side-by-Side', value: 'HSS' },
  ],
  // 'Подключ. Эл.плиты(стандарт)': [],
  EP: [],
  O: [],
  OEPA: [],
  V: [
    { text: 'Купольная', value: 'VK' },
    { text: 'Плоская', value: 'VP' },
    { text: 'Встраеваемая', value: 'VB' },
  ],
  W: [
    { text: 'Проточный', value: 'WP' },
    { text: 'Накопительный до 50 л.', value: 'W50' },
    { text: 'Накопительный от 50 л.', value: 'W00' },
  ],
  COND_SETUP: [
    { text: '7000', value: '7000' },
    { text: '9000', value: '9000' },
    { text: '12000', value: '12000' }
  ],
  COND_REMOVE: [
    { text: '7000', value: '7000' },
    { text: '9000', value: '9000' },
    { text: '12000', value: '12000' }
  ],
  COND_SERVICE: [],
  TV_SETUP: [
    { text: 'Диагональ до 32"', value: 'TV_SETUP_32' },
    { text: 'Диагональ до 46"', value: 'TV_SETUP_46' },
    { text: 'Диагональ свыше 46"', value: 'TV_SETUP_00' }
  ],
  TV_WALL: [
    { text: 'Диагональ до 32"', value: 'TV_SETUP_32' },
    { text: 'Диагональ до 46"', value: 'TV_SETUP_46' },
    { text: 'Диагональ свыше 46"', value: 'TV_SETUP_00' }
  ],
  TV_HOME_SETUP: [],
  TV_HOME_WALL: [],
  SMART: [],
  SAT_TEST: [],
  SAT_SETUP: [
    { text: 'Диаметр до 0.79', value: 'SAT_SETUP_79' },
    { text: 'Диаметр свыше 0.8', value: 'SAT_SETUP_00' }
  ],
  C_ROUTE: [],
  C_HARDWARE: [],
  С_SERVICE: [],
  C_OS: []

}

let additionalOptions = {
  WMB_BASIC: [
    { text: 'Доработка электросети', value: 'ADD_WM_E', price: '400' },
    { text: 'Доработка водоснабжения', value: 'ADD_WM_W', price: '500' },
    { text: 'Доработка слива', value: 'ADD_WM_G', price: '600' }
  ]
}