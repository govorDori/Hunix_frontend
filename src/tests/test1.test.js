import { describe, it, expect } from 'vitest';

describe('Something truthy and falsy', () => {
	it('True to be true', () => {
		expect(true).toBe(true);
	});

	it('False to be false', () => {
		expect(false).toBe(false);
	});
});