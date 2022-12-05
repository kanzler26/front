export default async function ({ $auth, $axios }: any) {
  // if dev
  await $axios.get("/user").then((response: any) => {
    /*
    if ( response.data.permissions ) {
      const permissions = []
      for ( const permission of response.data.permissions ) {
        permissions.push( permission.name )
      }
      this.$gates.setPermissions( permissions )
    }
    */
    $auth.setUser({ ...response.data })
  })

  if (!$auth.loggedIn) {
    return null
  }

  // const user = $auth?.user?.data
}
