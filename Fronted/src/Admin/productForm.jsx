import React, { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProductForm = ({ productId, setProductId, fetchProducts, productToUpdate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // If productToUpdate is passed, populate the form with existing product data
  useEffect(() => {
    if (productToUpdate) {
      reset({
        name: productToUpdate.name,
        category: productToUpdate.category,
        price: productToUpdate.price,
        description: productToUpdate.description,
        stockQuantity: productToUpdate.stockQuantity,
        img: productToUpdate.img,
      });
    }
  }, [productToUpdate, reset]);

  const [img,setImg] = useState([])
  
  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Append all fields from the form
    for (const key in data) {
      formData.append(key, data[key]);
    }
  
    // Append images if present
    img.forEach((image) => formData.append('img', image));
  
    try {
      if (productId) {
        // Update product
        await axios.put(`http://localhost:3000/api/products/${productId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create product
        await axios.post('http://localhost:3000/api/products/createProduct', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchProducts(); // Reload products after success
      setProductId(null); // Reset product ID for creating new entries
    } catch (error) {
      console.error("Error creating/updating product", error.response?.data || error.message);
    }
  };
  
  

  const handleFileChange = (e) => {
    setImg([...e.target.files]);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block">Product Name</label>
        <input
          id="name"
          {...register('name', { required: 'Product name is required' })}
          className="w-full p-2 border"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block">Category</label>
        <select
          id="category"
          {...register('category', { required: 'Category is required' })}
          className="w-full p-2 border"
        >
          <option value="">Select category</option>
          <option value="Jerseys">Jerseys</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
          <option value="Balls">Balls</option>
          <option value="Others">Others</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block">Price</label>
        <input
          id="price"
          type="number"
          {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be greater than 0' } })}
          className="w-full p-2 border"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block">Description</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="w-full p-2 border"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="stockQuantity" className="block">Stock Quantity</label>
        <input
          id="stockQuantity"
          type="number"
          {...register('stockQuantity', { required: 'Stock quantity is required', min: { value: 1, message: 'Stock quantity must be greater than 0' } })}
          className="w-full p-2 border"
        />
        {errors.stockQuantity && <p className="text-red-500">{errors.stockQuantity.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="img" className="block">Product Image URL</label>
        <input
          id="img"
          type="file"
          multiple
          onChange={handleFileChange}
         className="w-full p-2 border"
        />
        {errors.img && <p className="text-sm text-red-500 mt-1">{errors.img.message}</p>}

      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        {productId ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductForm;
