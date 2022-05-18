/** Check if AWS CLI is installed and at version 2. */
export const validateCliVersion = (props: { version: string }): {
	valid: boolean
	error?: Error
} =>
	(/aws-cli\/2/.test(props.version))
		? { valid: true }
		: { valid: false, error: new Error('AWS CLI version must be 2.x.') }
