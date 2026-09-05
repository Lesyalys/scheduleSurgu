export const formater = {
  // Метаданные с указанием, сколько строк брать
  metadata: {
    Согласовано: {
      type: "single", // single - берем следующую строку как значение
      key: "agreedBy",
      pattern: /_______/, // если есть такая строка, берем ее как значение
    },
    Утверждаю: {
      type: "single",
      key: "approvedBy",
      pattern: /_______/,
    },
    "Начальник УО по ОФО": {
      type: "single",
      key: "headOfDepartment",
      skipIfEmpty: true,
    },
    "Проректор по УМР": {
      type: "single",
      key: "viceRector",
      skipIfEmpty: true,
    },
    "Директор института": {
      type: "single",
      key: "director",
      skipIfEmpty: true,
    },
    "Зав. кафедрой": {
      type: "single",
      key: "headOfChair",
      skipIfEmpty: true,
    },
  },

  // Правила для многострочных блоков
  blocks: {
    "РАСПИСАНИЕ УЧЕБНЫХ ЗАНЯТИЙ": {
      type: "title",
      key: "title",
    },
    "Учебный год": {
      type: "singleLine",
      key: "year",
      valuePosition: "next", // берем следующую непустую строку
    },
    Семестр: {
      type: "singleLine",
      key: "semester",
      valuePosition: "next",
      allowedValues: ["осенний", "весенний"],
    },
    Институт: {
      type: "singleLine",
      key: "institute",
      valuePosition: "next",
    },
    Курс: {
      type: "singleLine",
      key: "course",
      valuePosition: "next",
    },
    Специальность: {
      type: "singleLine",
      key: "specialty",
      valuePosition: "next",
    },
    Группа: {
      type: "singleLine",
      key: "groups",
      valuePosition: "next",
      transform: (value) => value.split(",").map((g) => g.trim()),
    },
  },

  // Дни недели и их порядок
  days: {
    ПН: { key: "monday", order: 1 },
    ВТ: { key: "tuesday", order: 2 },
    СР: { key: "wednesday", order: 3 },
    ЧТ: { key: "thursday", order: 4 },
    ПТ: { key: "friday", order: 5 },
    СБ: { key: "saturday", order: 6 },
    ВС: { key: "sunday", order: 7 },
  },

  // Правила для парсинга пар
  pairs: {
    // Что считается номером пары
    pairPatterns: {
      type: "number",
      pattern: /^[1-8]$/, // номера пар от 1 до 8
      key: "pair",
      nextKey: "discipline",
    },
    // Ключевые слова для определения дисциплин
    disciplineKeywords: {
      type: "text",
      excludePatterns: [
        /^[1-8]$/, // исключаем номера пар
        /^[А-Я]\./, // исключаем инициалы
        /^[А-Я][а-я]+\s[А-Я]\./, // исключаем ФИО
        /^_______/, // исключаем подчеркивания
      ],
    },
    // Максимальное количество пар в день
    maxPairsPerDay: 8,
    // Минимальная длина для названия дисциплины
    minDisciplineLength: 2,
  },

  // Подписи и футер
  footer: {
    patterns: [
      "Директор института",
      "Зав. кафедрой",
      /^[А-Я]\.[А-Я]\.\s[А-Я][а-я]+$/, // формат ФИО
      /^[А-Я][а-я]+\s[А-Я]\.[А-Я]\.$/, // формат ФИО
      /^[А-Я][а-я]+\s[А-Я][а-я]+$/, // формат ФИО
    ],
    signaturePattern: /^[А-Я][а-я]+\s[А-Я]\./,
  },
};
