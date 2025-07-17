import axios from "axios";
import { BACKEND_URL } from "../../utils/url";
export const BIDDING_URL = `${BACKEND_URL}/bidding/`;

const placeBid = async (formData) => {
    const response = await axios.post(BIDDING_URL, formData, { withCredentials: true });
    return response.data;
};
const fetchBiddingHistory = async (id) => {
    const response = await axios.get(`${BIDDING_URL}/${id}`, { withCredentials: true });
    return response.data;
};
const sellProductByUser = async (productId) => {
    const response = await axios.post(`${BIDDING_URL}/sell`, { productId }, { withCredentials: true });
    return response.data;
};



const biddingService = {
    placeBid,
    fetchBiddingHistory,
    sellProductByUser,

};

export default biddingService;
