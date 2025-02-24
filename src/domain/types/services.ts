type CloudinaryEagerType = {
  transformation: string
  width: number
  height: number
  bytes: number
  format: string
  url: string
  secure_url: string
}

export interface CloudinaryResData {
  asset_id?: string
  public_id?: string
  version?: number
  version_id?: string
  signature?: string
  width?: number
  height?: number
  format?: string
  resource_type?: string
  created_at?: string
  tags?: (string | number)[]
  pages?: number
  bytes?: number
  type?: string
  etag?: string
  placeholder?: boolean
  url?: string
  secure_url?: string
  asset_folder?: string
  display_name?: string
  illustration_score?: number
  semi_transparent?: boolean
  grayscale?: boolean
  original_filename?: string
  eager?: CloudinaryEagerType[]
  api_key?: string
}

export interface CloudinarySigned {
  signature: string
  timestamp: string
}
