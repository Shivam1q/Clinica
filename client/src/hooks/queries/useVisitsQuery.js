import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVisit, getVisits } from "../../api/visits";
import { notify } from "../../store/notificationStore";
import { queryKeys } from "./queryKeys";

export const useVisitsQuery = () =>
  useQuery({
    queryKey: queryKeys.visits,
    queryFn: getVisits,
  });

export const useCreateVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.visits });
      notify.success("Visit note saved.");
    },
    onError: (error) => {
      notify.error(error.message || "Could not save visit.");
    },
  });
};
