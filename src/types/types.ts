namespace Express {
  export interface Request {
    filtered: {
      first_name?: string
      last_name?: string
      phone?: string
      email?: string
      password?: string
      gender?: string
      avatar?: string
      title?: string
      categoryId?: string
      category?: string
      subCategoryId?: string
      sub_sub_id?: string
      subSubCategory?: string
      price?: string
      //   comments?: string,
      rate?: number
      brand?: string
      size?: string
      netto?: string
      author?: string
      description?: string
      color?: string
      made_in?: string
      img?: string
      img1?: string
      img2?: string
      productId?: string | undefined
      stars?: number
      discont?: number
      count?: number
    }
  }
}

namespace Express {
  export interface Request {
    id: string
  }
}
