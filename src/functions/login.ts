import { timeDifference } from '../cli/utils/timeDifference'
import { ProfileConfig, LoginCache, LoginStatus } from '../types'

/** Type guard for profile login objects parsed from cache file contents. */
export const isLoginCache = (obj: Record<string, string>): obj is LoginCache =>
	(
		'accessToken' in obj &&
		'expiresAt' in obj &&
		'region' in obj &&
		'startUrl' in obj
	)

/** Determine if AWS CLI login cache is current and matches profile region and start URL. */
export const getLoginStatus = (props: {
  loginCache?: LoginCache,
  profileConfig: ProfileConfig
}): LoginStatus => {
	if (!props.loginCache) {
		return {
			valid: false,
			message: 'No login cache found.'
		}
	}

	const { expiresAt, region, startUrl } = props.loginCache
	const expiryDate = new Date(expiresAt)
	const isExpired = expiryDate <= new Date()
	const profileStartUrl = props.profileConfig.sso_start_url
	const profileRegion =
		props.profileConfig.sso_region ||
		props.profileConfig.region ||
		process.env.AWS_DEFAULT_REGION

	if (startUrl !== profileStartUrl) {
		return {
			valid: false,
			message: 'Login cache is invalid, start URL does not match profile config.'
		}
	}

	if (region !== profileRegion) {
		return {
			valid: false,
			message: 'Login cache is invalid, region does not match profile config.'
		}
	}

	if (isExpired) {
		return {
			valid: false,
			message: `Login cache expired ${timeDifference(new Date(expiresAt))}.`
		}
	}

	return {
		valid: true,
		message: `Login cache is valid, expires ${timeDifference(new Date(expiresAt))}.`
	}
}
