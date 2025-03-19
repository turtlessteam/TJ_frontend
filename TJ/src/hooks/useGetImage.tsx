import { getImage } from "@/apis/getImage";
import { getImageProps, getImageRes } from "@/type/apis/get";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface useGetImage {
  title: string;
}

export function useGetImage({
  title,
}: getImageProps): UseQueryResult<getImageRes, AxiosError> {
  const queryKey = ["get-image", title];

  const queryResult = useQuery<getImageRes, AxiosError>({
    queryKey,
    queryFn: async () => getImage({ title }),
  });

  return queryResult;
}
