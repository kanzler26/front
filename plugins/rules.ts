import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"

const numericalDeclension = {
  declension(value: number, words: string[]) {
    value = Math.abs(value) % 100
    const num = value % 10
    if (value > 10 && value < 20) {
      return words[2]
    }
    if (num > 1 && num < 5) {
      return words[1]
    }
    if (num === 1) {
      return words[0]
    }
    return words[2]
  },
  chars(number: number): string {
    return this.declension(number, [`символ`, `символа`, `символов`])
  },
}

const rules = {
  time: (value: string) => {
    if (value) {
      const [h, m] = value.split(`:`)
      const isValid =
        h?.length === 2 &&
        m?.length === 2 &&
        parseInt(h) <= 23 &&
        parseInt(m) <= 59
      if (!isValid) {
        return `Формат: 00:00`
      }
    }
    return true
  },
  snils: (v: any) =>
    (!!v &&
      (/^(?:\d{3}-\d{3}-\d{3}\s\d{2})?$/.test(v) ||
        `Формат 000-000-000 00`)) ||
    true,
  email: (v: any) =>
    (!!v &&
      (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        `Некорректный email`)) ||
    true,
  inn: (v: any) =>
    (!!v && ([10, 12].includes(v.length) || `Неверный формат ИНН`)) || true,

  bik: (v: number) => (!!v && v === 9 || 'Неверный формат БИК' || true),

  passport_number: (v: any) =>
    (!!v && ((v.length >= 5 && v.length <= 255) || `От 5 до 255 символов`)) ||
    true,
  passport_series: (v: any) =>
    (!!v && ((v.length >= 2 && v.length <= 20) || `От 2 до 20 символов`)) ||
    true,

  notBoolean: (value: boolean) => !!value || "Вы должны согласиться, чтобы продолжить",
  // advanced

  notEmpty: (v: any) => !!v || `Заполните поле`,
  notZero: (v: any) =>
    (!!v && (parseInt(v) > 0 || `Число больше нуля`)) || true,
  zeroOrMore: (v: any) =>
    (!!v && (parseInt(v) >= 0 || `Число больше или ровно нулю`)) || true,
  onlyNumber: (v: any) => (!!v && (!isNaN(v) || `Только число`)) || true,

  number: {
    min: (number: number) => (v: any) =>
      (!!v && !isNaN(v) && (v >= number || `Число от ${number}`)) || true,
    max: (number: number) => (v: any) =>
      (!!v && !isNaN(v) && (v <= number || `Число до ${number}`)) || true,
  },

  length: {
    fixed: (numbers: any) => (v: any) => {
      if (typeof numbers === "number") {
        numbers = [numbers]
      }
      if (Array.isArray(numbers)) {
        const lastNumber = numbers.pop()
        return (
          (!!v &&
            ([...numbers, lastNumber].includes(v.length) ||
              `Строго ${
                numbers.length
                  ? `${[...numbers].join(", ")} или ${lastNumber}`
                  : `${lastNumber}`
              } ${numericalDeclension.chars(lastNumber)}`)) ||
          true
        )
      }
    },
    min: (number: number, appendMessage: string = '') => (v: any) =>
      (!!v &&
        (v.length >= number ||
          `Минимум ${number} ${appendMessage}`)) ||
      true,
    max: (number: number) => (v: any) =>
      (!!v &&
        (v.length <= number ||
          `До ${number} ${numericalDeclension.chars(number)}`)) ||
      true,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (context: Context, inject: Inject) => {
  inject("rules", rules)
}

type RootRules = ReturnType<() => typeof rules>


declare module "vue/types/vue" {
  interface Vue {
    $rules: RootRules
  }
}
