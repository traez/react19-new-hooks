"use server";

/* Action 1 */
export async function incrementLike(
  prevState: number,
  data: FormData
): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(prevState + 1), 2000);
    
    // Hypothetical failure case - if something goes wrong, use data
    if (false) {
      const errorMessage = data.get("errorMessage") || "Unknown error occurred";
      reject(new Error(`Like increment failed: ${errorMessage}`));
    }
  });
}

/* Combined Action - addToCart */
export type CartStateType = {
  success: boolean;
  cartSize?: number;
  feedback: string;
};

export async function addToCart(
  prevState: CartStateType,
  queryData: FormData
): Promise<CartStateType> {
  const itemID = queryData.get("itemID");

  if (itemID === "1") {
    return {
      success: true,
      cartSize: 12,
      feedback: "Added to cart",
    };
  } else {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: false,
      cartSize: 0,
      feedback: "Couldn't add to cart: the item is sold out.",
    };
  }
}
