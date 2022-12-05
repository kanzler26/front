import Vue from 'vue'

Vue.filter( `valueOrZero`, ( value: any ) => value || 0 )

Vue.filter( `toReadableDate`, ( value: any ) => value.split( ' ' )[ 0 ].split( '-' ).reverse().join( '.' ) ) // 2022-03-05 23:59:59 to 05.03.2022

Vue.filter( `numberFormatWithSpaces`, ( value: number ) => new Intl.NumberFormat( 'ru-RU' ).format( value ) )
Vue.filter( `questionType`, ( value: string ) => {
  const types = {
    one: "выбор одного",
    multiple: "выбор нескольких",
    conformity: "соответствие",
    sequence: "последовательность",
    true_false: "верно или неверно",
  }
  // @ts-ignore
  return types[ value ] || "неизвестный тип вопроса"
})

Vue.filter( `examType`, ( value: string ) => {
  const types = {
    test: "тест",
    ticket: "билет"
  }
  // @ts-ignore
  return types[ value ] || "неизвестный тип экзамена"
})
