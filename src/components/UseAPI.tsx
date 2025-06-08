import { use } from "react";
import type { JSX } from "react";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  reviews: Review[];
}

async function fetchProduct(): Promise<Product> {
  const res = await fetch("https://dummyjson.com/products/1/?delay=5000");
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default function UseAPI(): JSX.Element {
  const product = use(fetchProduct());

  return (
    <section className="space-y-6 px-4">
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full sm:w-40 h-40 object-cover rounded-lg border mx-auto sm:mx-0"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-800">
              {product.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600">
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
            <div className="flex flex-wrap items-center gap-2 sm:gap-6 mt-2 text-sm sm:text-base">
              <span className="font-bold text-green-700">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-600">
                -{product.discountPercentage.toFixed(1)}% off
              </span>
              <span className="text-yellow-600 font-semibold">
                Rating: {product.rating}/5
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Reviews
          </h3>
          <ul className="space-y-3">
            {product.reviews.map((review, idx) => (
              <li
                key={idx}
                className="p-3 border rounded-lg bg-gray-50 text-xs sm:text-sm"
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
