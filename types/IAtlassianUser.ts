export interface ProductAccess {
  name: string
  key: string
  tier: string
  realm: string
  regions: string[]
  url: string
  last_active: string
}

export interface AtlassianUser {
  account_id: string
  account_type: string
  account_status: string
  name: string
  picture: string
  email: string
  access_billable: boolean
  last_active: string
  product_access: ProductAccess[]
  links: {
    self: string
  }
}

export interface AtlassianUserResponse {
  data: AtlassianUser[]
  links?: {
    next?: string
  }
}
