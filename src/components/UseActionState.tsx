"use client";
import { useActionState } from "react";
import { incrementLike, addToCart, type CartStateType } from "@/lib/actions";
//const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);

/* Combined Form Props */
type AddToCartFormProps = {
  itemID: string;
  itemTitle: string;
};

/* General Default Component */
export default function UseActionState() {
  /* Example 1 - Like Counter */
  const [likes, likeCountAction, isPending] = useActionState<number, FormData>(
    incrementLike,
    0
  );

  /* Combined Add To Cart Form - Each form has its own state */
  function AddToCartForm({ itemID, itemTitle }: AddToCartFormProps) {
    const [cartState, cartAction, isSubmitting] = useActionState<
      CartStateType,
      FormData
    >(addToCart, { success: false, feedback: "" });

    return (
      <form
        action={cartAction}
        className="border p-4 rounded mb-4 space-y-2 bg-white shadow"
      >
        <h2 className="text-lg font-semibold">{itemTitle}</h2>
        <input type="hidden" name="itemID" value={itemID} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
          disabled={isSubmitting}
        >
          Add to Cart
        </button>

        {/* Loading State */}
        {isSubmitting && (
          <div className="text-sm text-gray-600">Loading...</div>
        )}

        {/* Success State */}
        {cartState.success && cartState.cartSize && cartState.cartSize > 0 && (
          <div className="bg-green-100 text-green-800 p-2 rounded">
            {cartState.feedback}! You now have {cartState.cartSize} items in
            your cart.
          </div>
        )}

        {/* Error State */}
        {cartState.success === false && cartState.cartSize === 0 && (
          <div className="bg-red-100 text-red-800 p-2 rounded">
            {cartState.feedback} Cart size {cartState.cartSize}.
          </div>
        )}
      </form>
    );
  }

  return (
    <>
      <article>
        <div className="space-y-2">
          <p className="text-lg font-medium">Total Likes: {likes}</p>
          <form action={likeCountAction}>
            <button
              type="submit"
              disabled={isPending}
              className="border shadow bg-white p-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Like
            </button>
          </form>
        </div>
      </article>

      <article>
        <main className="p-6 max-w-md mx-auto space-y-6">
          <AddToCartForm
            itemID="1"
            itemTitle="JavaScript: The Definitive Guide"
          />
          <AddToCartForm itemID="2" itemTitle="JavaScript: The Good Parts" />
        </main>
      </article>
    </>
  );
}
