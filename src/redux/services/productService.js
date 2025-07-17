import axios from "axios";
import { BACKEND_URL } from "../../utils/url";
export const PRODUCT_URL = `${BACKEND_URL}/product`;

const createProduct = async (formData) => {
    const response = await axios.post(PRODUCT_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true
    });
    return response.data;
};
const getAllProduct = async () => {
    const response = await axios.get(`${PRODUCT_URL}`);
    return response.data;
};
const getAllProductofUser = async () => {
    const response = await axios.get(`${PRODUCT_URL}/user`, { withCredentials: true });
    return response.data;
};
const getAllWonedProductOfUser = async () => {
    const response = await axios.get(`${PRODUCT_URL}/won-products`, { withCredentials: true });
    return response.data;
};
const deleteProduct = async (id) => {
    const response = await axios.delete(`${PRODUCT_URL}/${id}`, { withCredentials: true });
    return response.data;
};
const getProduct = async (id) => {
    const response = await axios.get(`${PRODUCT_URL}/${id}`);
    return response.data;
};
const updateProduct = async (id, formData) => {
    const response = await axios.put(`${PRODUCT_URL}/${id}`, formData, { withCredentials: true });
    return response.data;
};

const updateProductByAdmin = async (id, formData) => {
    const response = await axios.patch(`${PRODUCT_URL}/admin/product-verified/${id}`, formData, { withCredentials: true });
    return response.data;
};

const productService = {
    createProduct,
    getAllProduct,
    getAllProductofUser,
    getAllWonedProductOfUser,
    deleteProduct,
    getProduct,
    updateProduct,
    updateProductByAdmin
};

export default productService;