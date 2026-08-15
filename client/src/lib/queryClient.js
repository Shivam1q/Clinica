import { QueryCache, QueryClient } from "@tanstack/react-query";
import { notify } from "../store/notificationStore";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      notify.error(error.message || "Could not reach the API.");
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});
