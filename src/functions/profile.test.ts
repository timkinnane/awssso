import * as profile from './profile'

describe('profile ➤', () => {
	describe('isProfileConfig', () => {
		it('returns true when object is a profile', () => {
			expect(profile.isProfileConfig({
				sso_account_id: '123456789',
				sso_start_url: 'https://sso.amazon.com/auth/start?app_id=123456789'
			})).toBe(true)
		})
		it('returns false when missing account ID', () => {
			expect(profile.isProfileConfig({
				sso_start_url: 'https://sso.amazon.com/auth/start?app_id=123456789'
			})).toBe(false)
		})
		it('returns false when missing start URL', () => {
			expect(profile.isProfileConfig({
				sso_account_id: '123456789'
			})).toBe(false)
		})
	})
	describe('parseConfigProfileName', () => {
		it('returns profile name from config header line', () => {
			expect(profile.parseConfigProfileName({
				configLine: '[profile tk]'
			})).toBe('tk')
		})
		it('returns profile name without "profile" prefix', () => {
			expect(profile.parseConfigProfileName({
				configLine: '[tk]'
			})).toBe('tk')
		})
		it('returns undefined without a profile name in header', () => {
			expect(profile.parseConfigProfileName({
				configLine: '[profile]'
			})).toBeUndefined()
		})
		it('returns undefined with an empty header', () => {
			expect(profile.parseConfigProfileName({
				configLine: '[ ]'
			})).toBeUndefined()
		})
		it('returns undefined when not a header', () => {
			expect(profile.parseConfigProfileName({
				configLine: 'aws_access_key_id = ABCD1234EXAMPLE'
			})).toBeUndefined()
		})
	})
	describe('parseConfigProfileProperty', () => {
		it('returns profile property from config line', () => {
			expect(profile.parseConfigProfileProperty({
				configLine: 'sso_account_id=123456789'
			})).toEqual({
				sso_account_id: '123456789'
			})
		})
		it('returns profile property from config line without whitespace', () => {
			expect(profile.parseConfigProfileProperty({
				configLine: 'sso_account_id =  123456789 '
			})).toEqual({
				sso_account_id: '123456789'
			})
		})
		it('returns undefined for header lines', () => {
			expect(profile.parseConfigProfileProperty({
				configLine: '[profile test]'
			})).toBeUndefined()
		})
		it('returns undefined when missing values', () => {
			expect(profile.parseConfigProfileProperty({
				configLine: 'sso_account_id='
			})).toBeUndefined()
		})
		it('returns undefined for non-assignment lines', () => {
			expect(profile.parseConfigProfileProperty({
				configLine: 'testing'
			})).toBeUndefined()
		})
	})
})
