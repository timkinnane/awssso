import type { SSO } from 'aws-sdk'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

export const writeCredentials = (props: {
	credentials: Record<string, SSO.RoleCredentials>,
	credentialsRegion: string,
	credentialsPath: string
}) => {
	const { credentials, credentialsPath, credentialsRegion } = props
	const credentialsFile = resolve(credentialsPath, 'credentials')
	const credentialsContent = Object.keys(credentials).map(profile => `[${profile}]
region = ${credentialsRegion}
aws_access_key_id = ${credentials[profile].accessKeyId}
aws_secret_access_key = ${credentials[profile].secretAccessKey}
aws_session_token = ${credentials[profile].sessionToken}`).join('\n')
	console.log(credentialsContent)
	writeFileSync(credentialsFile, credentialsContent, { encoding: 'utf8', flag: 'w' })
}
