-- CreateTable
CREATE TABLE "pending_subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "orderId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "pending_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pending_subscription_id_key" ON "pending_subscription"("id");
