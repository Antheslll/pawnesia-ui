import CreateComment from "@/components/comment/comment-overlay/createComment";
import CommentCard from "@/components/comment/commentCard";
import { AddToCartWhite } from "@/svg-assets/cart-icon";
import { StarIcon } from "@/svg-assets/star-icon";
import { ProductDetailResponse } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

async function getProductById(
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const Product = async ({ params }: ProductDetailProps) => {
  const { id } = params;

  const { dataProduct, dataComment } = await getProductById(id);

  if (!dataProduct) return notFound();
  console.log(dataComment);

  const ratingMap = dataComment?.data?.map((comment: any) => comment.rating);
  const ratingSum = ratingMap.reduce(
    (rating: number, ratingN: number) => rating + ratingN,
    0
  );
  const ratingAverage = Math.round((ratingSum / ratingMap.length) * 10) / 10;

  return (
    <>
      <CreateComment />
      <div>
        <Link href="/">
          <h1>HOME</h1>
        </Link>
      </div>
      <div className="w-full h-[100vh] grid grid-cols-[1.3fr_2fr]">
        <div className="w-full h-full pt-[10vh] flex justify-center">
          <div className="flex flex-col gap-y-5">
            <div
              className="w-[20vw] h-[20vw] bg-cover bg-center"
              style={{
                backgroundImage: `url(${dataProduct?.data?.product_image})`,
              }}
            ></div>
            <div className="grid grid-cols-[1fr_3fr]">
              <div className="flex-centered">
                <span>{ratingAverage}</span>
              </div>
              <div className="flex flex-row">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <div className="flex gap-x-2">
              <button className="w-[4vw] h-[4vw] button-background-color flex-centered">
                <AddToCartWhite />
              </button>
              <button className="w-[15.2vw] h-[4vw] button-background-color text-white">
                Checkout
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex pt-[10vh] pb-[40vh] flex-col">
          <div className="w-[90%] h-[50vh] flex flex-col">
            <div className="w-full h-[10vh] grid grid-cols-[2.5fr_1fr]">
              <div>
                <h1 className="text-[20px] poppins-font font-bold">
                  {dataProduct?.data?.product_name}
                </h1>
              </div>
              <div className="flex justify-end">
                <span className="poppins-font text-[20px] font-bold">
                  Rp {dataProduct?.data?.product_price.toLocaleString("ID")},-
                </span>
              </div>
            </div>
            <hr />
            <div className="w-full h-[15vh]">
              <p className="nunito-font">
                {dataProduct?.data?.product_description}
              </p>
            </div>
          </div>
          <div className="w-[90%] h-[50vh]">
            <div className="w-full h-[8vh] grid grid-cols-[5fr_1fr]">
              <div>
                <h4 className="text-[20px] pl-3 poppins-font font-bold">
                  Comment
                </h4>
              </div>
              <span className="flex justify-end pr-5 poppins-font font-bold">
                +
              </span>
            </div>
            <hr />
            <div className="w-full h-[70vh] flex flex-col gap-y-5 mt-5 overflow-y-auto overflow-x-hidden max-w-full break-words">
              {dataComment?.data?.map((comment: any) => (
                <CommentCard
                  key={comment.comment_id}
                  rating={comment.rating}
                  comment={comment.comments}
                  firstName={comment.User.first_name}
                  lastName={comment.User.last_name}
                  profilePicture={comment.User.profile_picture}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
