export async function cloudFileFetcher<T>(url: string, data: File): Promise<T> {
  const formData = new FormData();
  formData.append("image", data);
  try {
    const response = await fetch(url, {
      method: "POST",

      body: formData,
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    console.log(err);
    return null as unknown as T;
  }
}
