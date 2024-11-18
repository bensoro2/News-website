/*
  Warnings:

  - The values [Project_Articles] on the enum `News_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `authorId` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `authorId` INTEGER NOT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `type` ENUM('Food', 'Lifestyle', 'Geek_Development', 'Startup', 'IT_Gadget', 'Art_Design', 'Work_Life_Health', 'Project', 'Articles', 'Journey', 'Movies_Series_Songs', 'Diary') NOT NULL;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
