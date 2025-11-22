import axiosInstance from "./axios";

export type Product = {
  id: string;
  cid: string;
  address: string;
};

export const saveProduct = async (
  cid: string,
  address: string
): Promise<Product["id"]> => {
  const response = await axiosInstance.post<Product["id"]>("/save-product", {
    cid,
    address,
  });
  return response.data as Product["id"];
};

export const getProducts = async (address: string): Promise<Product[]> => {
  const response = await axiosInstance.get("/get-products", {
    params: { address },
  });
  return response.data;
};
