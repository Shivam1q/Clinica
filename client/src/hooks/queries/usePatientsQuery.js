import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient, getPatients } from "../../api/patients";
import { queryKeys } from "./queryKeys";

export const usePatientsQuery = () =>
  useQuery({
    queryKey: queryKeys.patients,
    queryFn: getPatients,
  });

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients });
    },
  });
};
