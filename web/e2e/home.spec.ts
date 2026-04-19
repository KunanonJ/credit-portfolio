import { expect, test } from "@playwright/test";

test.describe("Credit Portfolio home", () => {
  test("loads section nav and hero", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Page sections" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "One clean view",
    );
  });

  test("shows horizontal scroll hints at tablet width", async ({ page }) => {
    await page.setViewportSize({ width: 834, height: 900 });
    await page.goto("/");
    const hints = page.locator(".scroll-hint");
    await expect(hints).toHaveCount(4);
    await expect(hints.first()).toBeVisible();
  });

  test("hides scroll hints on wide viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto("/");
    await expect(page.locator(".scroll-hint").first()).toBeHidden();
  });
});
