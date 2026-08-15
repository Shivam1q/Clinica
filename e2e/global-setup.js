export default async function globalSetup() {
  const email = process.env.E2E_DOCTOR_EMAIL || "doctor@clinica.local";
  const password = process.env.E2E_DOCTOR_PASSWORD || "clinica123";

  const response = await fetch("http://localhost:4000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "E2E Doctor",
      email,
      password,
    }),
  });

  if (response.status !== 201 && response.status !== 409) {
    const body = await response.text();
    throw new Error(
      `Could not ensure E2E doctor account (${response.status}): ${body}`,
    );
  }
}
