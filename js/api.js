const API_URL = "https://dummyjson.com/products/category/beauty";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Products not found");
  }

  const data = await response.json();

  return data.products.map(function (product) {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      image: product.thumbnail,
      description: product.description,
      brand: product.brand || "Lumi Beauty",
      category: product.brand || "Lumi Beauty"
    };
  });
}