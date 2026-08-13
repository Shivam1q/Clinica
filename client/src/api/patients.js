export async function getPatients() {
  const response = await fetch("/api/patients");

  if (!response.ok) {
    throw new Error("Failed to load patients. Is json-server running?");
  }

  return response.json();
}

export async function createPatient(patient) {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    throw new Error("Failed to create patient.");
  }

  return response.json();
}
