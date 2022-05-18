import * as login from './login'

const profileConfig = {
	sso_start_url: 'https://sso.amazon.com/auth/start?app_id=123456789',
	sso_region: 'us-east-1',
	sso_account_id: '123456789',
	sso_role_name: 'AdminPermissionSet',
	region: 'us-east-1',
	output: 'json'
}

describe('login ➤', () => {
	describe('getLoginStatus', () => {
		it('returns valid if cache is valid and current', () => {
			expect(login.getLoginStatus({
				loginCache: {
					accessToken: 'ABCD1234EXAMPLE',
					expiresAt: '2099-12-31T23:59:59Z',
					region: 'us-east-1',
					startUrl: 'https://sso.amazon.com/auth/start?app_id=123456789'
				},
				profileConfig
			}).valid).toBe(true)
		})
		it('returns invalid if cache is expired', () => {
			expect(login.getLoginStatus({
				loginCache: {
					accessToken: 'ABCD1234EXAMPLE',
					expiresAt: '2001-01-01T01:01:01Z',
					region: 'us-east-1',
					startUrl: 'https://sso.amazon.com/auth/start?app_id=123456789'
				},
				profileConfig
			}).valid).toBe(false)
		})
	})
	it('returns invalid if cache from a different region', () => {
		expect(login.getLoginStatus({
			loginCache: {
				accessToken: 'ABCD1234EXAMPLE',
				expiresAt: '2001-01-01T01:01:01Z',
				region: 'us-west-1',
				startUrl: 'https://sso.amazon.com/auth/start?app_id=123456789'
			},
			profileConfig
		}).valid).toBe(false)
	})
	it('returns invalid if start URL is different to profile', () => {
		expect(login.getLoginStatus({
			loginCache: {
				accessToken: 'ABCD1234EXAMPLE',
				expiresAt: '2001-01-01T01:01:01Z',
				region: 'us-east-1',
				startUrl: 'https://sso.amazon.com/auth/start?app_id=123456789&foo=bar'
			},
			profileConfig
		}).valid).toBe(false)
	})
})
