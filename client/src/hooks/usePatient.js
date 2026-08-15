import { usePatientQuery } from "./queries/usePatientsQuery";

export const usePatient = (id) => {
  const query = usePatientQuery(id);

  return {
    patient: query.data ?? null,
    isLoading: Boolean(id) && query.isPending,
    isError: query.isError,
    error: query.error,
  };
};
