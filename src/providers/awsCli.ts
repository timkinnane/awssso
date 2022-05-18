import { homedir } from 'os'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { createHash } from 'crypto'
import { execSync, spawn } from 'child_process'
import type { LoginCache } from '../types'

/** @todo Confirm if path getters are cross-platform. */

/** Get AWS CLI config file path. */
export const getConfigPath = () => resolve(homedir(), '.aws/config')

/** Get AWS CLI cache file path. */
export const getCachePath = () => resolve(homedir(), '.aws/sso/cache')

/** Get AWS CLI credential file path. */
export const getCredentialPath = () => resolve(homedir(), '.aws/credentials')

/** Exec subprocess to get AWS CLI version, ensuring it's installed. */
export const getCliVersion = (): { version?: string, error?: Error } => {
	try {
		const version = execSync('aws --version', { encoding: 'utf8' })
		return { version }
	} catch (error) {
		return { error }
	}
}

/** Spawn subprocess to login and generate cached credentials. */
export const loginWithCli = (props: { profileName: string }): Promise<{ output?: string, error?: string }> => {
	const child = spawn('aws', ['sso', 'login', '--profile', props.profileName])
	child.stdout.setEncoding('utf8')
	let output = ''
	let error = ''

	child.stdout.on('data', data => (output += data))
	child.stderr.on('data', data => (error += data))

	return new Promise((resolve, reject) => {
		child.on('close', code => {
			if (code === 0) resolve({ output, error })
			else reject(new Error(error))
		})
	})
}

/** Find JSON and parse AWS CLI cache file using hashed AWS SSO StartUrl. */
export const readLoginCache = (props: {
  cachePath: string,
  startUrl: string
}): { cache?: LoginCache, error?: Error } => {
	try {
		const cacheHash = createHash('sha1').update(props.startUrl).digest('hex')
		const cacheFile = resolve(props.cachePath, `${cacheHash}.json`)
		if (!existsSync(cacheFile)) {
			return {}
		}
		const cache: LoginCache = JSON.parse(readFileSync(cacheFile, { encoding: 'utf8' }))
		return { cache }
	} catch (error) {
		return { error }
	}
}

/** Return config file content. */
export const readConfigFile = (props: {
  configPath: string
}): { configContent?: string, error?: Error } => {
	try {
		const configFile = resolve(props.configPath)
		const configContent = readFileSync(configFile, { encoding: 'utf8' })
		return { configContent }
	} catch (error) {
		return { error }
	}
}
