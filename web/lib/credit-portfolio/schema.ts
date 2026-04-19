import { z } from "zod";

export const accountSchema = z.object({
  issuer: z.string(),
  name: z.string(),
  statementDate: z.string(),
  dueDate: z.string(),
  balance: z.number(),
  minimumDue: z.number(),
  note: z.string(),
  limit: z.number().optional(),
  sharedLimit: z.number().optional(),
  limitShown: z.number().optional(),
});

export const portfolioSchema = z.object({
  asOf: z.string(),
  accounts: z.array(accountSchema),
});

export const auditRowSchema = z.object({
  description: z.string(),
  sheetPaid: z.number(),
  verified: z.number().nullable(),
  status: z.string(),
  statusLabel: z.string(),
  note: z.string(),
});

export const aprilAuditSchema = z.object({
  sheetTotalRow: z.number(),
  rows: z.array(auditRowSchema),
});

export const debtPlanItemSchema = z.object({
  label: z.string(),
  group: z.string(),
  balance: z.number(),
  rate: z.number(),
  aprilPaid: z.number(),
  note: z.string(),
  needsReview: z.boolean().optional(),
});

export const debtPlanSchema = z.object({
  items: z.array(debtPlanItemSchema),
});

export type Account = z.infer<typeof accountSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type AprilAudit = z.infer<typeof aprilAuditSchema>;
export type DebtPlan = z.infer<typeof debtPlanSchema>;
export type DueFilter = "all" | "overdue" | "upcoming";
