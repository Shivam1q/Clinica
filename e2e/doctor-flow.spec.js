import { expect, test } from "@playwright/test";

const doctorEmail = process.env.E2E_DOCTOR_EMAIL || "doctor@clinica.local";
const doctorPassword = process.env.E2E_DOCTOR_PASSWORD || "clinica123";

test("doctor can log in, create a patient, and add a visit", async ({
  page,
}) => {
  const stamp = Date.now();
  const patientName = `E2E Patient ${stamp}`;
  const phone = `98${String(stamp).slice(-8)}`;
  const visitSummary = `E2E visit note ${stamp}`;

  await page.goto("/login");
  await page.getByLabel("Email").fill(doctorEmail);
  await page.getByLabel("Password").fill(doctorPassword);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  await page.getByRole("button", { name: "Add patient" }).click();
  await page.getByLabel("Name").fill(patientName);
  await page.getByLabel("Phone").fill(phone);
  await page.getByRole("button", { name: "Add patient" }).click();

  await expect(page.getByText("Patient added successfully.")).toBeVisible();
  await page.locator(".patient-card", { hasText: patientName }).click();

  await expect(
    page.locator(".patient-timeline").getByRole("heading", { name: patientName }),
  ).toBeVisible();

  await page.getByRole("button", { name: "New visit note" }).click();
  await page.getByLabel("Draft note").fill(visitSummary);
  await page.getByRole("button", { name: "Save visit" }).click();

  await expect(page.locator(".visit-summary", { hasText: visitSummary })).toBeVisible();
});
