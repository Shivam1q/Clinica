import { useMemo } from "react";
import { useCreateVisit, useVisitsQuery } from "./queries/useVisitsQuery";

export const useVisits = (patientId) => {
  const query = useVisitsQuery();
  const create = useCreateVisit();
  const visits = query.data ?? [];

  const patientVisits = useMemo(() => {
    if (!patientId) {
      return visits;
    }
    return visits.filter((visit) => visit.patientId === patientId);
  }, [visits, patientId]);

  return {
    visits,
    patientVisits,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    createVisit: create.mutateAsync,
    isCreating: create.isPending,
  };
};
