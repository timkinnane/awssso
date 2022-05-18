import { SSO } from 'aws-sdk'
import { LoginCache, ProfileConfig } from '../types'

const client = new SSO({ region: 'us-east-1' })

export const getCredentials = async (props: { config: ProfileConfig, cachedLogin: LoginCache }) => {
	const res = await client.getRoleCredentials({
		roleName: props.config.sso_role_name,
		accountId: props.config.sso_account_id,
		accessToken: props.cachedLogin.accessToken
	}).promise()
	return res.roleCredentials
}
