import { getRankImage } from "@/apis/getRankImage";
import { getImageProps, getImageRes } from "@/type/apis/get";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface useGetRankImage {
  title: string;
}

export function useGetRankImage({
  title,
}: getImageProps): UseQueryResult<getImageRes, AxiosError> {
  const queryKey = ["get-rank-image", title];

  const queryResult = useQuery<getImageRes, AxiosError>({
    queryKey,
    queryFn: async () => getRankImage({ title }),
  });

  return queryResult;
}
