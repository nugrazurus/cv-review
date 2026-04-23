import { Hono } from 'hono';
import { LandingPage, UploadPage, ResultsPage } from './pages';
import { uploadApi } from './api';

const app = new Hono();

// Mount API routes
app.route('/api', uploadApi);

// Page routes
app.get('/', (c) => {
  return c.html(LandingPage());
});

app.get('/upload', (c) => {
  return c.html(UploadPage());
});

app.get('/results', (c) => {
  return c.html(ResultsPage());
});

// Export for Cloudflare Workers
export default app;