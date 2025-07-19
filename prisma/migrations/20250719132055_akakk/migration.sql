/*
  Warnings:

  - Added the required column `hospitalid` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "hospitalid" TEXT NOT NULL;
