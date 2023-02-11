export interface FILTERED {
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
  //  discont: string
}

export interface HEADERS {
  token: string
  tokenId: string
}

export interface DISCONT {
  discont: number
}

export interface ORDER {
  count: number
  productId: string | undefined
}
