import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../api/appointments";
import { queryKeys } from "./queryKeys";

export const useAppointmentsQuery = () =>
  useQuery({
    queryKey: queryKeys.appointments,
    queryFn: getAppointments,
  });
