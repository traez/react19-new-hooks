import { use } from "react";
import type { JSX } from "react";

async function fetchProduct() {
  const res = await fetch("https://dummyjson.com/products/1/?delay=5000");
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default function UseAPI(): JSX.Element {
  const product = use(fetchProduct());

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-40 h-40 object-cover rounded-lg border"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-indigo-800">
              {product.title}
            </h2>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Category: <strong>{product.category}</strong>
              </span>
              <span>
                Brand: <strong>{product.brand}</strong>
              </span>
              <span>
                Stock: <strong>{product.stock}</strong>
              </span>
            </div>
            <div className="flex items-center gap-6 mt-2">
              <span className="text-xl font-bold text-green-700">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-red-600">
                -{product.discountPercentage.toFixed(1)}% off
              </span>
              <span className="text-yellow-600 font-semibold">
                Rating: {product.rating}/5
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Reviews</h3>
          <ul className="space-y-4">
            {product.reviews.map((review: any, idx: number) => (
              <li
                key={idx}
                className="p-4 border rounded-lg bg-gray-50 text-sm"
              >
                <div className="font-medium text-gray-900">
                  {review.reviewerName} &middot;{" "}
                  <span className="text-yellow-700">
                    Rating: {review.rating}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
