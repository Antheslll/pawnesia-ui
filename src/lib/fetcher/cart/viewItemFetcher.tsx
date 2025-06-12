export async function viewItemFetcher(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(JSON.stringify(errorResult));
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("error: ", err);
    return err;
  }
}
