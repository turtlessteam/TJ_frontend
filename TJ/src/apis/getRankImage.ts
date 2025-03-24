import { getImageProps, getImageRes } from "@/type/apis/get/index";
import { clientAuth } from "./client";
import { AxiosResponse } from "axios";

export const getRankImage = async ({
  title,
}: getImageProps): Promise<getImageRes> => {
  const response: AxiosResponse<getImageRes> = await clientAuth({
    url: `/rank/images?title=${title}`,
    method: "get",
  });
  return response.data;
};
