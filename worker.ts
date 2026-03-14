export interface Env {
  ASSETS: { fetch: typeof fetch };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // V2: All logic is client-side. Just serve static assets.
    return env.ASSETS.fetch(request);
  },
};
