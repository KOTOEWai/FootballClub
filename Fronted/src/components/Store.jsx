import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/shoppingCart";


function Store() {
  const [products, setProducts] = useState([]);
  const [totalPages,setTotalPages] = useState(1);
  const [currentpage, setPage] = useState(1);
  const limit = 3;
const dispatch = useDispatch();
  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products?page=${page}&limit=${limit}`);
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentpage);
  }, [currentpage]);

const handlePageChange = (page) => {
  setPage(page);
};

const handleAddCart = (product) => {
    dispatch(addItem({id: product._id, name: product.name, price: product.price, img:product.img}))
};
  return (
    <div className="mt-3 mb-5 px-4 md:px-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl overflow-hidden duration-300 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={`http://localhost:3000/uploads/${product.img[0]}`}
                alt="Product"
                className="  md:w-72 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-500 uppercase text-xs mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-black truncate mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm truncate mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-black">
                    ${product.price}
                  </p>
                  <button
                   onClick={()=>handleAddCart(product)}
                  className="text-white bg-black rounded-full p-2 hover:bg-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
        disabled={currentpage === 1}
         onClick={()=>handlePageChange(currentpage-1)} className="bg-black text-white rounded-full p-2 hover:bg-gray-800">
          Previous
        </button>
 
        { Array.from({length:totalPages},(_,index) =>(
        <button key={index}
         className={`px-4 py-2 mx-1 rounded-lg ${
          currentpage=== index + 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={()=>handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
          ) )}

        <button 
        disabled={currentpage === totalPages}
        onClick={()=>handlePageChange(currentpage +1)} className="bg-black text-white rounded-full p-2 hover:bg-gray-800">
          Next
        </button>

      </div>
    </div>
  );
}

export default Store;
