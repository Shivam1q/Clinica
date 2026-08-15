import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient, getPatients } from "../../api/patients";
import { notify } from "../../store/notificationStore";
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
    onSuccess: (patient) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients });
      notify.success(`Patient added: ${patient.name}`);
    },
    onError: (error) => {
      notify.error(error.message || "Could not save patient.");
    },
  });
};
