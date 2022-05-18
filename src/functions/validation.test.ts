import * as validation from './validation'

describe('validation ➤', () => {
	describe('validateCliVersion', () => {
		it('ensures version is 2', () => {
			expect(validation.validateCliVersion({
				version: 'aws-cli/2.6.2 Python/3.9.12 Darwin/21.4.0'
			}).valid)
				.toBe(true)
		})
	})
})
