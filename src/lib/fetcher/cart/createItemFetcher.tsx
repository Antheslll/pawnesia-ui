export default async function createItemFetcher<T>(
  url: string,
  data: unknown
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
  } catch (err) {
    console.error("Error: ", err);
    return null as unknown as T;
  }
}
