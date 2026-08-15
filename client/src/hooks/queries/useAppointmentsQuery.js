import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointment, getAppointments } from "../../api/appointments";
import { notify } from "../../store/notificationStore";
import { queryKeys } from "./queryKeys";

export const useAppointmentsQuery = () =>
  useQuery({
    queryKey: queryKeys.appointments,
    queryFn: getAppointments,
  });

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
      notify.success("Appointment added.");
    },
    onError: (error) => {
      notify.error(error.message || "Could not save appointment.");
    },
  });
};
