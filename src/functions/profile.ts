import type { ProfileConfig } from '../types'

/** Type guard for profile objects parsed from config file contents. */
export const isProfileConfig = (obj: Record<string, string>): obj is ProfileConfig => {
	return 'sso_account_id' in obj && 'sso_start_url' in obj
}

/** Parse a config file line and return the profile name if it's a profile header line. */
export const parseConfigProfileName = (props: {
  configLine: string
}): string | undefined => {
	const name = /\[(profile)?\s*(?<name>.*)\]/.exec(props.configLine)?.groups?.name?.trim() // ?
	return name || undefined
}

/** Parse a config file line and return as an object property if it's a value assignment. */
export const parseConfigProfileProperty = (props: {
  configLine: string
}): Record<string, string> | undefined => {
	const [key, value] = props.configLine.split('=')
	if (value?.trim()) {
		return { [key.trim()]: value.trim() }
	}
}
