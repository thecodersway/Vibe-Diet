/**
 * Global HTTP Fetch Interceptor for Debugging & Monitoring.
 * Intercepts all global fetch requests (including Supabase, Gemini, Storage, etc.)
 * and logs details about request headers, payload body, response status, roundtrip duration, and JSON body.
 */

// Save a reference to the original native fetch function
const originalFetch = global.fetch;

// Override the global fetch API
global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const method = init?.method || 'GET';
  const url = typeof input === 'string' ? input : (input as any).url || input.toString();
  const start = Date.now();

  try {
    const response = await originalFetch(input, init);
    const duration = Date.now() - start;

    // Parse Request Body safely
    let requestBody = null;
    if (init?.body) {
      try {
        if (typeof init.body === 'string') {
          let parsedBody = JSON.parse(init.body);
          if (parsedBody.image && typeof parsedBody.image === 'string') {
            parsedBody.image = `${parsedBody.image.substring(0, 40)}... [IMAGE_DATA_TRUNCATED]`;
          }
          requestBody = JSON.stringify(parsedBody);
        } else {
          requestBody = '[Binary/Form-Data]';
        }
      } catch {
        requestBody = '[Unparseable Payload]';
      }
    }

    // Parse Response Body safely
    let responseBody = null;
    const responseClone = response.clone();
    try {
      const text = await responseClone.text();
      try {
        // Compact JSON representation
        responseBody = JSON.stringify(JSON.parse(text));
      } catch {
        responseBody = text.length > 150 ? `${text.substring(0, 150)}...` : text;
      }
    } catch {
      responseBody = '[Unreadable Stream]';
    }

    // Output single unified console entry
    console.log(
      `🌐 [HTTP] ${method} ${url} ➡️ ${response.status} (${duration}ms)\n` +
      `   REQ ➡️ ${requestBody || 'None'}\n` +
      `   RES ⬅️ ${responseBody || 'None'}`
    );

    return response;
  } catch (error: any) {
    const duration = Date.now() - start;
    console.error(`❌ [HTTP Error] ${method} ${url} failed after ${duration}ms: ${error.message || error}`);
    throw error;
  }
};
