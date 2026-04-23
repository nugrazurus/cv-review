import { describe, it, expect } from 'vitest';
import app from '../src';

describe('CV Rebel Hono App', () => {
	describe('GET /', () => {
		it('returns landing page HTML', async () => {
			const res = await app.request('/');
			expect(res.status).toBe(200);
			expect(res.headers.get('content-type')).toContain('text/html');
			const html = await res.text();
			expect(html).toContain('CV_REBEL');
			expect(html).toContain('YOUR CV');
		});
	});

	describe('GET /upload', () => {
		it('returns upload page HTML', async () => {
			const res = await app.request('/upload');
			expect(res.status).toBe(200);
			expect(res.headers.get('content-type')).toContain('text/html');
			const html = await res.text();
			expect(html).toContain('UPLOAD YOUR CV');
			expect(html).toContain('Drop your CV here');
		});
	});

	describe('GET /results', () => {
		it('returns results page HTML', async () => {
			const res = await app.request('/results');
			expect(res.status).toBe(200);
			expect(res.headers.get('content-type')).toContain('text/html');
			const html = await res.text();
			expect(html).toContain('ANALYSIS COMPLETE');
			expect(html).toContain('CV SCORE');
		});
	});

	describe('POST /api/upload', () => {
		it('returns 400 for missing file', async () => {
			const res = await app.request('/api/upload', {
				method: 'POST',
			});
			expect(res.status).toBe(400);
		});
	});
});