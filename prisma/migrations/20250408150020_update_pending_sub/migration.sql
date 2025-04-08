/*
  Warnings:

  - Added the required column `userName` to the `pending_subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pending_subscription" ADD COLUMN     "userName" TEXT NOT NULL;
