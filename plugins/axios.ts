export default function ({ $axios }: any) {

  if (!process.env.prod) {
    $axios.setToken(process.env.AUTHORIZATION_BEARER_TOKEN, "Bearer")
  }

  /*
  $axios.onError( ( error: any ) => {
    // console.log( 'ajax error', error.response )
  })
  */

}
