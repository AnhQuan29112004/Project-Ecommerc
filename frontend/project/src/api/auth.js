import api from './api';
import Cookies from 'js-cookie';

export const login = async (email, password) => {
  const response = await api.post('/auth/login/', { email, password });
  console.log(response.data);
  const data = response.data.data;
  console.log(data.accessToken);
  localStorage.setItem('accessToken', data.accessToken);
  Cookies.set('refreshToken', data.refreshToken, { expires: 7 });
  return response.data;
};

export const getAccesstoken = async (refresh) => {
  const response = await api.post('/auth/getAccesstoken/', { refresh });
  localStorage.setItem('accessToken', data.accessToken);
  return response.data;
}

export const register = async (username, email, password) => {
  const response = await api.post('/auth/register/', { username, email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/auth/getUser/');
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout/');
  localStorage.removeItem('accessToken');
  Cookies.remove('refreshToken');
};

export const getVendors = async () => {
  const response = await api.get('/user/getVendor/');
  return response.data;
};

export const getVendorProducts = async (vendorId) => {
  const response = await api.get(`/user/getVendor/${vendorId}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories/'); // Cần thêm endpoint thực
  return response.data;
};

export const getCategoryProducts = async (slug) => {
  const response = await api.get(`/category/products/${slug}/`); // Cần thêm endpoint thực
  return response.data;
};

// export const getCart = async () => {
//   const response = await api.get('/cart/'); // Cần thêm endpoint thực
//   return response.data;
// };

// export const getCartCount = async () => {
//   const response = await api.get('/cart/count/'); // Cần thêm endpoint thực
//   return response.data;
// };

// export const addToCart = async (productId, quantity) => {
//     const response = await api.post('/cart/add/', { productId, quantity });
//     return response.data;
//   };
export const getAllProducts = async () => {
    const response = await api.get('/products/');
    return response.data;
  };

export const getProductDetail = async (slug) => {
  const response = await api.get(`/products/${slug}`); 
  return response.data;
}

export const getProductSameTag = async (slug) => {
  const response = await api.get(`/products/tag/${slug}`); 
  return response.data;
}