export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Thin fetch wrapper for this app's own /api routes. Centralizes error
 * parsing so every react-query queryFn/mutationFn shares the same shape.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(path, init);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      body?.message ?? `Request to ${path} failed with status ${response.status}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}
