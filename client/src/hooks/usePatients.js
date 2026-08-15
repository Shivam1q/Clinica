import { useCreatePatient, usePatientsQuery } from "./queries/usePatientsQuery";

export const usePatients = () => {
  const query = usePatientsQuery();
  const create = useCreatePatient();

  return {
    patients: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    createPatient: create.mutateAsync,
    isCreating: create.isPending,
  };
};
