export async function registerFetcher<T>(
  url: string,
  data: unknown,
  handler: (message: string) => void
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(JSON.stringify(errorBody.message));
    }
    const result = await response.json();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    handler(err.message);
    return null as unknown as T;
  }
}
