import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient, getPatient, getPatients } from "../../api/patients";
import { notify } from "../../store/notificationStore";
import { queryKeys } from "./queryKeys";

export const usePatientsQuery = () =>
  useQuery({
    queryKey: queryKeys.patients,
    queryFn: getPatients,
  });

export const usePatientQuery = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.patient(id),
    queryFn: () => getPatient(id),
    enabled: Boolean(id),
    initialData: () => {
      const list = queryClient.getQueryData(queryKeys.patients);
      return list?.find((patient) => patient.id === id);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(queryKeys.patients)?.dataUpdatedAt,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: (patient) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients });
      queryClient.setQueryData(queryKeys.patient(patient.id), patient);
      notify.success(`Patient added: ${patient.name}`);
    },
    onError: (error) => {
      notify.error(error.message || "Could not save patient.");
    },
  });
};
