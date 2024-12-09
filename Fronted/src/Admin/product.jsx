import { useState, useEffect } from "react";
import ProductForm from "./productForm";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  // Fetch products
  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products?page=${page}&limit=${limit}`
      );
      setProducts(response.data.data); 
      console.log(response.data)// Assuming `products` key holds the product array
      setTotalPages(response.data.totalPages); // Assuming `totalPages` is provided in API response
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle edit
  const handleEdit = (product) => {
    setProductId(product._id);
    setProductToUpdate(product);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      fetchProducts(currentPage); // Refresh current page after deletion
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container">
      {/* Product Form */}
      <ProductForm
        productId={productId}
        setProductId={setProductId}
        fetchProducts={() => fetchProducts(currentPage)}
        productToUpdate={productToUpdate}
      />

      <h2>Product List</h2>

      {/* Product Cards */}
      <div className="ms-5 flex justify-start items-center flex-wrap gap-5">
        {products.map((product, i) => (
          <div
            key={i}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={`http://localhost:3000/uploads/${product.img[0]}`}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  Brand
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.category}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      $900
                    </p>
                  </del>
                </div>
              </div>
            </a>
            <div className="flex justify-between px-4 py-2">
              <button onClick={() => handleEdit(product)} className="text-blue-500">
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
