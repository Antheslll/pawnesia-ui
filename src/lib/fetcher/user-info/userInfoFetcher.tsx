export const userInfoFetcher = async <T,>(
  url: string,
  token: unknown,
  handler: (message: string) => void
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(JSON.stringify(errorResult.message));
    }
    const result = await response.json();
    return result;
  } catch (err: any) {
    handler(err.message);
    return null as unknown as T;
  }
};
