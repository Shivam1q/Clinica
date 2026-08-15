import { useMemo } from "react";
import { usePatients } from "./usePatients";

export const useFilteredPatients = (query) => {
  const { patients, isLoading, isError, error, createPatient, isCreating } =
    usePatients();

  const filteredPatients = useMemo(() => {
    const normalized = String(query ?? "")
      .trim()
      .toLowerCase();
    if (!normalized) {
      return patients;
    }
    return patients.filter((patient) => {
      const name = patient.name.toLowerCase();
      const phone = String(patient.phone);
      return name.includes(normalized) || phone.includes(normalized);
    });
  }, [patients, query]);

  return {
    patients,
    filteredPatients,
    isLoading,
    isError,
    error,
    createPatient,
    isCreating,
  };
};
