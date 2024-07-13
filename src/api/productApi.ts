import api, { getHeaders } from "./apiConfig";

export const fetchProducts = async (page: number) => {
    const headers = await getHeaders();
    const response = await api.get(`/product?page=${page}`, { headers });
    return response.data;
};