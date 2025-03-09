import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetfoodQuery,
  useGetcatQuery,
} from "../features/auth/authApiSlice.js";
import { ClipLoader } from "react-spinners"; // Import a spinner from react-spinners
import F_img from '../assets/food.png'

export const Menu = () => {
  const { id } = useParams(); // Get hotelID from URL params
  const [categories, setCategories] = useState([]);
  const category = useSelector((state) => state.auth.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const hotelID = id;
  const {
    data: categoryData = [],
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetcatQuery(hotelID, { skip: !!category }); // Skip if already in Redux store

  useEffect(() => {
    if (category?.length) {
      setCategories(category);
      setSelectedCategory(category[0]?.id);
    } else if (categoryData?.length) {
      setCategories(categoryData);
      setSelectedCategory(categoryData[0]?.id);
    }
  }, [category, categoryData]);

  // Fetch food items based on selected category
  const {
    data: foodItems = [],
    isLoading: isFoodLoading,
    isError: isFoodError,
  } = useGetfoodQuery(
    { hotelID, id: selectedCategory },
    { skip: !selectedCategory }
  );

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter food items based on search query
  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading and error states
  if (isCategoryLoading || isFoodLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} /> {/* Blue spinner */}
        <p className="ml-4 text-gray-600">Loading menu...</p>
      </div>
    );
  }

  if (categoryError || isFoodError) {
    return (
      <p className="text-center text-red-500">
        {categoryError?.data?.message || isFoodError?.data?.message}
      </p>
    );
  }

  return (
    <div className="p-4 font-sans">
      {/* Title */}
      <h1 className="pb-5 text-3xl text-gray-800 text-left font-[Poppins] tracking-wide">
        Select <span className="text-blue-400 font-extrabold">Food</span> And{" "}
        <br />
        <span className="text-blue-400 font-extrabold">Order</span>{" "}
        <span>From Here</span>
      </h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-full max-w-xs flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 text-base focus:outline-none"
          />
          <button className="bg-blue-400 text-white px-4 py-2 text-base font-medium rounded-r-full hover:bg-blue-500 transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="flex overflow-x-auto space-x-4 py-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`flex-shrink-0 px-6 py-2 rounded-full transition-colors ${
              selectedCategory === cat.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Food List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {filteredFoodItems.map((item) => (
          <Link key={item.id} to={`/details/${item.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              {item?.image ? (
                <img
                  src={item.image}
                  alt={item.name || "Unnamed Food Item"}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.src ={F_img}; // Fallback if image fails to load
                  }}
                />
              ) : (
                <img
                  src={F_img}
                  alt={item.name || "Unnamed Food Item"}
                  className="w-full h-52 object-cover"
                />
              )}

              {/* Food Details */}
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-lg mb-4">{item.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(Math.floor(item.rating))}
                    {item.rating % 1 !== 0 ? "☆" : ""}
                  </span>
                  <span className="ml-2 text-lg text-gray-700">
                    {item?.rating?.toFixed(1)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {item.price}
                  </span>
                  <button className="bg-blue-500 text-white text-lg px-5 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
