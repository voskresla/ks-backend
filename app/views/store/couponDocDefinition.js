export let couponDocDefinition = {
  pageSize: 'A4',
  pageOrientation: 'landscape',
  pageMargins: [5, 5, 5, 5],

  info: {
    title: 'Купон на установку {{couponNumber}}',
    author: '{{username}}',
    subject: '{{productFullName}}',
    keywords: '',
  },




  content: [

    {
      table: {

        widths: ['*', '*'],
        body: [
          [
            { text: 'Левая часть остается у клиента', style: 'headerInfo', border:[false,false,true,true] },
            { text: 'Правая часть остается у мастера', style: 'headerInfo', border:[true,false,false,true] }
          ],
          [
            { text: 'Купон на установку № НТ1201001050617/001001050617/121001050617', style: 'h1', border: [false, true, true, false] },
            { text: 'Купон на установку № НТ1201001050617/001001050617/121001050617', style: 'h1', border: [true, true, true, false] },
          ],
        ]
      },

      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 1 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 1 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? '#e4e4e4' : '#e4e4e4';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
        },
        // paddingLeft: function(i, node) { return 4; },
        // paddingRight: function(i, node) { return 4; },
        // paddingTop: function(i, node) { return 2; },
        // paddingBottom: function(i, node) { return 2; }
      },
    },

    {
      table: {

        widths: ['*', '*'],
        body: [

          [
            { text: 'От правильности установки и ввода в эксплуатацию аппарата зависит не только срок работы техники и его гарантийное обслуживание, но так же и здоровье вас и вашей семьи. Доверьтесь профессионалам! ', style: 'text',border:[false,false,true,true] },
            { text: '', style: 'h1' },
          ],
          [
            {
              stack: [
                {
                  text: 'Работы и материалы, входящие в стоимость купона:', style: 'text'  
                },
                {
                  ul: [
                    { text: 'Выезд специалиста по городу (возможен выезд специалиста в радиусе 50 км от города, который оплачивается по действующему прайс-листу Сервисной Компании)', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Распаковка и визуальная проверка техники', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Проверка исправности и готовности к подключению водо-, электросети и системы канализации.', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Снятие транспортных креплений', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Установка техники на место эксплуатации и выставление по уровню в разных плоскостях для исключения вибрации', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Доработка сети электроснабжения: установка розетки с заземляющим контактом; Перфорация стен (перегородок) для прокладки коммуникаций; Прокладка электрического кабеля открытым способом (до 9 м.); монтажные работы в электрощитке.', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Доработка системы водоснабжения: Перфорация стен (перегородок) для прокладки коммуникаций; монтаж водопроводного крана в водосеть клиента; замена/сращивание/ удлинение наливного, шланга, гибкой подводки', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Доработка системы канализации: замена/сращивание/удлинение, сливного шланга; организация стационарного слива', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Подключение к существующим точкам водо-, электроснабжения и системе канализации, с учетом требований производителя техники и «Правил техники безопасности»', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Проверка герметичности всех соединений', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Проверка работоспособности техники.', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Очистка рабочей зоны и уборка мусора, оставшегося после установки', style: 'text', margin: [10, 0, 0, 0] },
                    { text: 'Демонстрация работы Вашей новой техники и объяснение основных функций', style: 'text', margin: [10, 0, 0, 0] },
                    
                  ]
                },
                {
                    text:'Материалы, входящие в стоимость Купона: Розетка "евростандарт" 16 А. для открытой проводки; вилка "евростандарт" 16 А. (разборная); автомат 16 А. / 2п. (отеч.); коробка под автомат; провод ПВС  3*1,5 мм. (белый); провод МПВ 4.0 мм (белый); крепежные изделия пластиковые зажимы для кабеля 7-8 мм; сливной шланг до 1 м.; концевик на модульный сливной шланг; крепежные хомуты "Norma","ABA" 17-28 мм.; сифон с отводом для подключения СМА и ПММ; гибкий гофрированный выпуск к сифону; патрубок прямой - d.40 (d.50) мм.;  ниппель для сращивания сливных шлангов d.19/d.21 мм. (пласт.); муфта резиновая d.50*d.73 мм.; шланг наливной пластиковый (Италия) до 4 м; подводка гибкая бронированная на воду; кран; водоотвод латунный (в сборе); тройник; переходник; муфта, бочонок.', style: 'text', margin:[0,5,0,0]
                },
                {
                    text:'В стоимость подключения не входит: выравнивание пола, работы по изменению конфигурации шкафов  или рабочих поверхностей.', style: 'text', bold:true
                },
                {
                    text: [
                        'По всем вопросам обращайтесь по телефону: ',
                        {text: '8-902-100-ХХХХ; ХХ-ХХ-ХХ', bold:true}    
                    ],
                    margin:[0,5,0,0],
                    style:'text'
                },
                {
                    text: [
                        'Texника: ',
                        {text: '                                                 ', decoration: 'underline'},
                        'Серия №: ',
                        {text: '                                                 ', decoration: 'underline'},
                    ],
                    margin:[0,5,0,0]
                },
                {
                    text: [
                        
                        {text: 'Гарантия на установку 12 месяцев. По вопросам гарантии на установку техники обращайтесь по телефону: '},
                        {text: '8-902-100-ХХХХ; ХХ-ХХ-ХХ', bold:true}
                    ],
                    style: 'text',
                    margin:[0,5,0,0]
                },
                {
                     text: [
                        'Подпись продавца: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,10,0,0]
                },
                {
                     text: [
                        'Подпись покупателя: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,10,0,0]
                },
                {
                     text: [
                        'Установка произведена мастером: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,10,0,0]
                }
              ],
              border:[false,false,true,true]
            },
            {
                border:[true,false,false,true],
                stack: [
                    {
                        text: [
                            {text: 'По всем вопросам установки обращайтесь по телефону: '},
                            {text: '8-902-100-ХХХХ; ХХ-ХХ-ХХ', bold:true}
                        ],
                        style: 'text2',
                    },
                    {
                        text: 'Установка  производиться только при наличии купона на установку, чека на оплату услуги. ',
                        style: 'text2'
                    },
                    {
                        text: 'Срок действия купона 3 месяца',
                        style: 'text2'
                    },
                    {
                        text: [
                            'Наименование купона: ',
                            {text: "Подключчение DW (премиум)", style: 'h1', bold:true}
                        ],
                        margin: [0,15,0,0]
                    },
                    {
                        text: [
                            'Дата продажи: ',
                            {text: "26 августа 2017 г", style: 'h1', bold:true}
                        ],
                        margin: [0,5,0,0]
                    },
                    {
                         text: [
                            'ФИО покупателя: ',
                            {text: '                                                                                                    ', decoration: 'underline'},
                        
                        ],
                    margin:[0,15,0,0]
                },
                {
                    text: [
                        'Texника: ',
                        {text: '                                                 ', decoration: 'underline'},
                        'Серия №: ',
                        {text: '                                                 ', decoration: 'underline'},
                    ],
                    margin:[0,5,0,0]
                },
                {
                    text: [
                        'Дата установки:', ' «',
                        {text: '      ', decoration: 'underline'}, '» ',
                        
                        {text: '                                  ', decoration: 'underline'},
                        {text: ' 201 '},
                        {text: '    ', decoration: 'underline'}, ' г.'
                    ],
                    margin:[0,5,0,0]
                },
                {
                     text: [
                        'Подпись продавца: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,15,0,0]
                },
                {
                     text: [
                        'Подпись покупателя: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,10,0,0]
                },
                {
                     text: [
                        'Установка произведена мастером: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,10,0,0]
                },
                {
                    text: '.                                                                                                                                         ',
                    decoration: 'overline',
                    decorationStyle: 'dashed',
                    margin: [0,5,0,0]
                },
                { 
                    text: 'Купон на установку № НТ1201001050617/001001050617/121001050617', 
                    style: 'h1', 
                    border: [true, true, true, false] 
                },
                {
                    text: [
                        'Дата продажи: ',
                        {text: "26 августа 2017 г", style: 'h1', bold:true}
                    ],
                    margin: [0,15,0,0]
                },
                {
                    text: [
                        'Наименование купона: ',
                        {text: "Подключчение DW (премиум)", style: 'h1', bold:true}
                    ],
                    margin: [0,5,0,0]
                },
                {
                    text: [
                        'Дата установки:', ' «',
                        {text: '      ', decoration: 'underline'}, '» ',
                        
                        {text: '                                  ', decoration: 'underline'},
                        {text: ' 201 '},
                        {text: '    ', decoration: 'underline'}, ' г.'
                    ],
                    margin:[0,15,0,0]
                },
                {
                     text: [
                        'Подпись продавца: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,15,0,0]
                },
                {
                     text: [
                        'Подпись покупателя: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,15,0,0]
                },
                {
                     text: [
                        'Претензий к установке не имею. Место установку и сумма дополнительных работы согласовано до проведения монтажа: ',
                        
                    ],
                    margin:[0,15,0,0]
                },
                {
                     text: [
                        
                        {text: '.                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,15,0,0]
                },
                {
                     text: [
                        'Установка произведена мастером: ',
                        {text: '                         ', decoration: 'underline'},
                        {text: '  / '},
                        {text: '                         ', decoration: 'underline'},
                    ],
                    margin:[0,10,0,0]
                },
                
                ]
            }
          ]
        ]
      },

      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 0 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 1 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? '#e4e4e4' : '#e4e4e4';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
        },
        // paddingLeft: function(i, node) { return 4; },
        // paddingRight: function(i, node) { return 4; },
        //paddingTop: function(i, node) { return 0; },
        // paddingBottom: function(i, node) { return 2; }
      },
    }

  ],

  styles: {
    headerInfo: {
      fontSize: 8,
      alignment: 'center',
      margin: [0, 0, 0, 0],

    },
    h1: {
      fontSize: 11,
      alignment: 'center',
      margin: [0, 0, 0, 0],

    },
    text: {
      fontSize: 9,
      alignment: 'left',
      margin: [0, 0, 0, 0],
    },
    text2: {
      fontSize: 10,
      alignment: 'left',
      margin: [0, 0, 0, 0],
    },
    xsmall: {
        decoration: 'overline', 
        decorationStyle: 'dashed',
        paddingTop: '40'
    }
        
    

  }
}