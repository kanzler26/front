// todo: create filter payload function
// filterPayload

// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from "@nuxtjs/axios"

export interface ApiResponse<Type> {
  valid?: boolean | null
  data: Type,
  error?: string | any
}

const preparePayload = (model: any, data: any, add = true) => {
  const result: any = {}
  for (const key in model) {
    if (data[key] || data[key] === "" || data[key] === false) {
      if (typeof model[key] === "object") {
        result[key] = preparePayload(model[key], data[key])
      } else {
        result[key] = data[key] // проверка на тип
      }
    } else if (add) {
      result[key] = null
    }
  }
  return result
}



interface IPrepareRoute {
  route: string,
  query?: any
}

const prepareRoute = (options: IPrepareRoute) => {
  const query = options.query ? `?${new URLSearchParams(options.query).toString()}` : ""
  return `${options.route}${query}`
}



interface IValidateRequest {
  statuses?: number[]
}

const validateRequest = (request: any, { statuses }: IValidateRequest) => {
  // todo: check request status
  if (statuses && !statuses.includes(request.status)) {
    return false
  }
  if ( request?.headers[ "content-type" ] !== "application/json" ) {
    // return false
  }
  return true
}


interface IRequestValidation {
  statuses: number[]
}

interface IApiExecuteParameters {
  url: {
    route: string,
    query?: object
  }
  data?: {
    payload: any,
    model?: any
  }
  validate?: IRequestValidation
}
class Api {

  private axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  /*
  async execute ( method: string, { route, query, validate, request, data, payload }: IApiExecuteParameters) {
    const preparedRoute = prepareRoute({ route, query })
    const preparedPayload = data && payload ? preparePayload( payload, data ) : null
    try {
      const response = await request({ preparedRoute, preparedPayload })
      const valid = requestValidation(response, validate)
      console.log( 'api execute', response )
      return valid && response?.data ? response.data : null
    } catch ( e: any ) {
      return e?.response?.data
    }
  }
  */

  async execute ( method: string, options: IApiExecuteParameters ): Promise<any> {
    const {
      url: { route, query },
      data,
      validate
    } = options
    const preparedRoute = prepareRoute({ route, query })
    const preparedPayload = data?.payload && data?.model ? preparePayload( data?.model, data?.payload ) : data?.payload
    try {
      let request = null
      if ( method === 'get' ) {
        request = await this.axios.get( preparedRoute )
      }
      if ( method === 'post' ) {
        request = await this.axios.post( preparedRoute, preparedPayload )
      }
      if ( method === 'put' ) {
        request = await this.axios.put( preparedRoute, preparedPayload )
      }
      if ( method === 'patch' ) {
        request = await this.axios.patch( preparedRoute, preparedPayload )
      }
      if ( method === 'delete' ) {
        request = await this.axios.delete( preparedRoute, { data: preparedPayload } )
      }
      const valid = validate ? validateRequest(request, validate) : true
      return {
        valid,
        data: request?.data,
        error: !valid ? 'Invalid request' : false
      }
    } catch ( error: any ) {
      return { valid: false, error: error?.response?.data }
    }
  }

  executeGet ( options: IApiExecuteParameters ) {
    return this.execute( 'get', options )
  }

  executePost ( options: IApiExecuteParameters ) {
    return this.execute( 'post', options )
  }

  executePut ( options: IApiExecuteParameters ) {
    return this.execute( 'put', options )
  }

  executePatch ( options: IApiExecuteParameters ) {
    return this.execute( 'patch', options )
  }

  executeDelete ( options: IApiExecuteParameters ) {
    return this.execute( 'delete', options )
  }

}



export {
  prepareRoute,
  preparePayload,
  validateRequest,
  Api
}
