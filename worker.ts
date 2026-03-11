import { handleAnalyze, handleAnalyzeOptions } from './api/analyze';
import { handleCreateContact, handleCreateContactOptions } from './api/create-contact';

export interface Env {
  ASSETS: { fetch: typeof fetch };
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/analyze') {
      if (request.method === 'OPTIONS') return handleAnalyzeOptions();
      if (request.method === 'POST') return handleAnalyze(request, env);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    if (url.pathname === '/api/create-contact') {
      if (request.method === 'OPTIONS') return handleCreateContactOptions();
      if (request.method === 'POST') return handleCreateContact(request, env);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    // All other requests: serve static assets (with SPA fallback)
    return env.ASSETS.fetch(request);
  },
};
