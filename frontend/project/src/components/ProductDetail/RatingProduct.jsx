import { useEffect, useState } from 'react';
import api from '../../api/api';
import React from 'react';
import useAuthStore from '../../store/authStore';
import productDetail from '../../store/productDetail';


const RatingProduct = ({productSlug, productRating }) => {
    console.log("Slug:",productSlug);
    const { user } = useAuthStore((state) => state);
    const { fetchDetailProduct, loading, error, detail } = productDetail((state) => state);

    const [allRating, setAllRating] = useState(productRating.allRating);
    const [averageRating, setAverageRating] = useState(productRating.average_rating);
    const [formData, setFormData] = useState({
        rating: 0,
        review: '',
        userName: user ? user.data.username : 'Anonymous',
        product: productSlug,
    });
    
    const changeFormData = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const {rating, review, userName, product} = formData;
    const handleAddReview = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/rating/create',  {rating, review, userName, product}
            );
            const data = response.data;
            console.log('Review added:', data);
            fetchDetailProduct(productSlug);
            setAllRating(detail.rating.allRating);

            setFormData({
                rating: 0,
                review: '',
                userName: user ? user.data.username : 'Anonymous',
                product: productSlug,
            });
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          <h2 className="text-lg font-semibold mb-4">Customer questions & answers</h2>
          <div className="space-y-4">
            {allRating.map((rating, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500">{rating.user}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                    {new Date(rating.create_at).toLocaleDateString()} - {new Date(rating.create_at).toLocaleTimeString()}
                        </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.rating ? 'text-yellow-500' : 'text-gray-300'
                          } fill-current`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-lg font-medium">{rating.review}</p>
              </div>
            ))}
          </div>
        </div>



        <div className="lg:flex-1">
          <h2 className="text-lg font-semibold mb-4">Customer reviews</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating) ? 'text-yellow-500' : 'text-gray-300'
                    } fill-current`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div> */}
              <p className="text-sm text-gray-500">
                (Rating: <span className="font-medium">{productRating.average_rating}</span> out of 5)
              </p>
            </div>
            
            <a
              href="#"
              className="block mt-4 text-sm text-blue-500 hover:underline"
            >
              How are ratings calculated?
            </a>
          </div>
        </div>
      </div>


      <div className="mt-8 border-2">
        <form onSubmit={handleAddReview} className="bg-white rounded-lg shadow-sm p-6">
            <p>Add Reviews</p>
            <div className="rate">
                {[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].reverse().map((val, i) => (
                    <React.Fragment key={i}>
                    <input type="radio" onChange={changeFormData} name="rating" id={`rating${i}`} value={val} required /><label htmlFor={`rating${i}`} title={val} className={val % 1 !== 0 ? "half" : ''}></label>

                    </React.Fragment>
                ))}
            </div>
            <input name="review" onChange={changeFormData} value={formData.review} type="textarea" placeholder="Enter your review" className="border-2 border-gray-300 rounded-md p-2 w-full mb-4" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Submit Review
            </button>
        </form>
      </div>
    </div>
  );
};

export default RatingProduct;