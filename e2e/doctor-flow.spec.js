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

  const countLabel = page.locator(".patient-count");
  await expect(page.getByText("Loading patients…")).toHaveCount(0);
  await expect(countLabel).toContainText("on file");
  const beforeCount = Number(
    (await countLabel.textContent())?.match(/\d+/)?.[0] ?? "0",
  );

  await page.getByRole("button", { name: "Add patient" }).click();
  await page.getByLabel("Name").fill(patientName);
  await page.getByLabel("Phone").fill(phone);
  await page.getByRole("button", { name: "Add patient" }).click();

  await expect(
    page.locator(".toast-success", { hasText: `Patient added: ${patientName}` }),
  ).toBeVisible();
  await expect(countLabel).toHaveText(`${beforeCount + 1} on file`);
  await page.locator(".patient-card", { hasText: patientName }).click();

  await expect(
    page.locator(".patient-timeline").getByRole("heading", { name: patientName }),
  ).toBeVisible();

  await page.getByRole("button", { name: "New visit note" }).click();
  await page.getByLabel("Draft note").fill(visitSummary);
  await page.getByRole("button", { name: "Save visit" }).click();

  await expect(
    page.locator(".toast-success", { hasText: "Visit note saved." }),
  ).toBeVisible();
  await expect(page.locator(".visit-summary", { hasText: visitSummary })).toBeVisible();

  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator(".toast")).toHaveCount(0);
});
