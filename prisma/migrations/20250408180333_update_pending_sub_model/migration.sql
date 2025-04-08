/*
  Warnings:

  - Added the required column `customerId` to the `pending_subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pending_subscription" ADD COLUMN     "customerId" TEXT NOT NULL;
