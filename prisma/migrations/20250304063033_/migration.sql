-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_financial_record_id_fkey` FOREIGN KEY (`financial_record_id`) REFERENCES `financial_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
