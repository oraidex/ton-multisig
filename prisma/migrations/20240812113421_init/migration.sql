-- CreateTable
CREATE TABLE "Multisig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "importedBy" TEXT,
    "signers" TEXT NOT NULL,
    "proposers" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Multisig_address_key" ON "Multisig"("address");
