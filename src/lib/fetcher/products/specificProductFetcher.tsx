/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDetailResponse } from "@/types";

async function getProductById(
  id: string
): Promise<ProductDetailResponse | null | any> {
  try {
    const resProduct = await fetch(`http://localhost:5000/api/products/${id}`, {
      cache: "no-store", // atau "force-cache" kalau mau SSG
    });

    const resComment = await fetch(`http://localhost:5000/api/comments/${id}`, {
      cache: "no-store",
    });
    if (!resProduct.ok || !resComment.ok) return null;

    const dataProduct = await resProduct.json();
    const dataComment = await resComment.json();
    return { dataProduct, dataComment };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getProductById;
