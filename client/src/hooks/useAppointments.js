import {
  useAppointmentsQuery,
  useCreateAppointment,
} from "./queries/useAppointmentsQuery";

export const useAppointments = () => {
  const query = useAppointmentsQuery();
  const create = useCreateAppointment();

  return {
    appointments: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    createAppointment: create.mutateAsync,
    isCreating: create.isPending,
  };
};
