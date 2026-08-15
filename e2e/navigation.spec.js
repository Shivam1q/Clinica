import { expect, test } from "@playwright/test";

const doctorEmail = process.env.E2E_DOCTOR_EMAIL || "doctor@clinica.local";
const doctorPassword = process.env.E2E_DOCTOR_PASSWORD || "clinica123";

const signIn = async (page) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(doctorEmail);
  await page.getByLabel("Password").fill(doctorPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
};

test("sidebar navigates without a full reload and back works", async ({
  page,
}) => {
  await signIn(page);

  await page.getByRole("link", { name: "Schedule" }).click();
  await expect(page).toHaveURL(/\/schedule/);
  await expect(page.getByRole("heading", { name: "Schedule" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();

  await page.getByRole("link", { name: "Billing" }).click();
  await expect(page).toHaveURL(/\/billing/);
  await expect(page.getByRole("heading", { name: "Billing" })).toBeVisible();

  await page.getByRole("link", { name: "Portal" }).click();
  await expect(page).toHaveURL(/\/portal/);
  await expect(page.getByRole("heading", { name: "Patient portal" })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/billing/);

  await page.getByRole("link", { name: "Dashboard" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test("unknown paths show a 404 inside the app after login", async ({
  page,
}) => {
  await signIn(page);

  await page.goto("/this-route-does-not-exist");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();

  await page.getByRole("link", { name: "Return to dashboard" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test("protected pages redirect to login when signed out", async ({ page }) => {
  await page.goto("/schedule");
  await expect(page).toHaveURL(/\/login/);
});
