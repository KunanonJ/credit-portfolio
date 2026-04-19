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
});
