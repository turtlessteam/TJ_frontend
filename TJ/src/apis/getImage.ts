import { getImageProps, getImageRes } from "@/type/apis/get/index";
import { clientAuth } from "./client";
import { AxiosResponse } from "axios";

export const getImage = async ({
  title,
}: getImageProps): Promise<getImageRes> => {
  const response: AxiosResponse<getImageRes> = await clientAuth({
    url: `/images?title=${title}`,
    method: "get",
  });
  return response.data;
};
