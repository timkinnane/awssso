export type ProfileConfig = {
  sso_start_url: string
  sso_account_id: string
  sso_region?: string
  sso_role_name?: string
  region?: string
  output?: string
}

export type LoginCache = {
  startUrl: string
  region: string
  accessToken: string
  expiresAt: string
}

export type LoginStatus = {
  valid: boolean
  message: string
}
