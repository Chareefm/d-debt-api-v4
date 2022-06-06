-- CreateTable
CREATE TABLE "oa" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "oa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" VARCHAR(32) NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "salt" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "oa_id" INTEGER NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oa_capability" (
    "id" SERIAL NOT NULL,
    "job_type" VARCHAR(100) NOT NULL,
    "capability" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "oa_id" INTEGER NOT NULL,

    CONSTRAINT "oa_capability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt" (
    "id" BIGSERIAL NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cid" BIGINT NOT NULL,
    "cif" INTEGER NOT NULL,
    "productcode" VARCHAR(100) NOT NULL,
    "productdesc" VARCHAR(100) NOT NULL,
    "subproductcode" VARCHAR(100) NOT NULL,
    "subproductdesc" VARCHAR(100) NOT NULL,
    "contractsigndate" BIGINT NOT NULL,
    "contractEnddate" BIGINT NOT NULL,
    "approveamt" DECIMAL NOT NULL,
    "installmentamt" DECIMAL NOT NULL,
    "schinstallment" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "lastpaymentdate" BIGINT NOT NULL,
    "overdueamt" DECIMAL NOT NULL,
    "paidperiod" DECIMAL NOT NULL,
    "payseq" VARCHAR(100) NOT NULL,
    "int" VARCHAR(100) NOT NULL,
    "intdefault" DECIMAL NOT NULL,
    "intnow" DECIMAL NOT NULL,
    "intstatus" VARCHAR(100) NOT NULL,
    "principleamt" DECIMAL NOT NULL,
    "intaccrued" DECIMAL NOT NULL,
    "intCharge" DECIMAL NOT NULL,
    "closepayamt" DECIMAL NOT NULL,
    "closeintamt" DECIMAL NOT NULL,
    "calclosedate" BIGINT NOT NULL,
    "accountIdentify" VARCHAR(100) NOT NULL,
    "accountlevel" INTEGER NOT NULL,
    "writeoffdate" BIGINT NOT NULL,
    "subaccstatus" VARCHAR(100) NOT NULL,
    "masteracc" INTEGER NOT NULL,
    "accountstatus" INTEGER NOT NULL,
    "accountstatusdesc" VARCHAR(100) NOT NULL,
    "zdelperm" VARCHAR(100) NOT NULL,
    "zobfp" VARCHAR(100) NOT NULL,
    "zobfi" VARCHAR(100) NOT NULL,
    "oseqdt" VARCHAR(100) NOT NULL,
    "ownerBranchCode" INTEGER NOT NULL,
    "ownerBranchDesc" VARCHAR(100) NOT NULL,
    "detail" JSONB NOT NULL,
    "agent_id" BIGINT,
    "oa_id" INTEGER,

    CONSTRAINT "debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt_address" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cid" INTEGER NOT NULL,
    "cif" INTEGER NOT NULL,
    "ad1" VARCHAR(100) NOT NULL,
    "ad2" VARCHAR(100) NOT NULL,
    "ad3" VARCHAR(100) NOT NULL,
    "ad4" VARCHAR(100) NOT NULL,
    "zsdistcd" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "mzip" VARCHAR(100) NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "debt_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cus" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cif" INTEGER NOT NULL,
    "ztitle" VARCHAR(100) NOT NULL,
    "fname" VARCHAR(100) NOT NULL,
    "lnm" VARCHAR(100) NOT NULL,
    "zcizid" INTEGER NOT NULL,
    "dob" INTEGER NOT NULL,
    "sex" VARCHAR(100) NOT NULL,
    "zocc" INTEGER NOT NULL,
    "zocc_desc" VARCHAR(100) NOT NULL,
    "zsocc" INTEGER NOT NULL,
    "zsocc_desc" VARCHAR(100) NOT NULL,
    "zocc2" INTEGER NOT NULL,
    "zocc2_desc" VARCHAR(100) NOT NULL,
    "zsocc2" INTEGER NOT NULL,
    "zsocc2_desc" VARCHAR(100) NOT NULL,
    "hph" DECIMAL NOT NULL,
    "bph" INTEGER NOT NULL,
    "aph" INTEGER NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "cus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cus_address" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cif" INTEGER NOT NULL,
    "pad1" INTEGER NOT NULL,
    "pad2" INTEGER NOT NULL,
    "pad3" INTEGER NOT NULL,
    "pad4" INTEGER NOT NULL,
    "zpsdiscd" INTEGER NOT NULL,
    "pcity" INTEGER NOT NULL,
    "pstate" INTEGER NOT NULL,
    "pzip" INTEGER NOT NULL,
    "mad1" VARCHAR(100) NOT NULL,
    "mad2" INTEGER NOT NULL,
    "mad3" INTEGER NOT NULL,
    "mad4" INTEGER NOT NULL,
    "zmsdiscd" INTEGER NOT NULL,
    "mcity" INTEGER NOT NULL,
    "mstate" INTEGER NOT NULL,
    "mzip" INTEGER NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "cus_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cob" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cid" INTEGER NOT NULL,
    "cif" INTEGER NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "cob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trn" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cid" INTEGER NOT NULL,
    "tseq" INTEGER NOT NULL,
    "etc" VARCHAR(100) NOT NULL,
    "tjd" INTEGER NOT NULL,
    "time" VARCHAR(100) NOT NULL,
    "tot" DECIMAL NOT NULL,
    "endbal" DECIMAL NOT NULL,
    "efd" INTEGER NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "trn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "odt" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cid" INTEGER NOT NULL,
    "seq" INTEGER NOT NULL,
    "odtyp" INTEGER NOT NULL,
    "odtyp_desc" VARCHAR(100) NOT NULL,
    "stdt" BIGINT NOT NULL,
    "expdt" INTEGER NOT NULL,
    "clamt" DECIMAL NOT NULL,
    "activate" INTEGER NOT NULL,
    "ratecmp" DECIMAL NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "odt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sod" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "cid" INTEGER NOT NULL,
    "cif" INTEGER NOT NULL,
    "irn" DECIMAL NOT NULL,
    "tld" INTEGER NOT NULL,
    "zfwos" INTEGER NOT NULL,
    "zfwod" INTEGER NOT NULL,
    "zstatcd" INTEGER NOT NULL,
    "zstatcd_desc" VARCHAR(100) NOT NULL,
    "bal" DECIMAL NOT NULL,
    "zcltot" DECIMAL NOT NULL,
    "zintdel" DECIMAL NOT NULL,
    "zdelprin" DECIMAL NOT NULL,
    "zdlprd" DECIMAL NOT NULL,
    "zexpdt" INTEGER NOT NULL,
    "acr" DECIMAL NOT NULL,
    "negacr" DECIMAL NOT NULL,
    "negacrun" DECIMAL NOT NULL,
    "darcls" INTEGER NOT NULL,
    "darcovr" INTEGER NOT NULL,
    "provcat" INTEGER NOT NULL,
    "boo" INTEGER NOT NULL,
    "boo_desc" VARCHAR(100) NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "sod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_card" (
    "cif" VARCHAR(100) NOT NULL,
    "citizen_id" INTEGER NOT NULL,
    "name_title" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "birth_date" BIGINT NOT NULL,
    "gender" VARCHAR(100) NOT NULL,
    "occupation" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "house_number" VARCHAR(100) NOT NULL,
    "sub_district" VARCHAR(100) NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "zip_code" VARCHAR(100) NOT NULL,
    "home_tel_no" VARCHAR(100) NOT NULL,
    "office_tel_no" VARCHAR(100) NOT NULL,
    "tel_no" VARCHAR(100) NOT NULL,
    "customer_no" VARCHAR(100) NOT NULL,
    "account_no" VARCHAR(100) NOT NULL,
    "card_no" VARCHAR(100) NOT NULL,
    "current_bill_cycle" BIGINT NOT NULL,
    "minimum_payment" BIGINT NOT NULL,
    "provision_flag_cur" VARCHAR(100) NOT NULL,
    "past_due" INTEGER NOT NULL,
    "delq30days" INTEGER NOT NULL,
    "delq60days" INTEGER NOT NULL,
    "current_due" INTEGER NOT NULL,
    "current_total_amt_due" INTEGER NOT NULL,
    "paid_amt" INTEGER NOT NULL,
    "current_balance" BIGINT NOT NULL,
    "principal_amount" BIGINT NOT NULL,
    "interest_amt" BIGINT NOT NULL,
    "fee_amt" BIGINT NOT NULL,
    "totl_principal_amount" BIGINT NOT NULL,
    "send_data_date" BIGINT NOT NULL,
    "type_of_product" VARCHAR(100) NOT NULL,
    "card_type" VARCHAR(100) NOT NULL,
    "card_catagory" VARCHAR(100) NOT NULL,
    "billing_cycle" INTEGER NOT NULL,
    "cycle_due" INTEGER NOT NULL,
    "block_code" VARCHAR(100) NOT NULL,
    "due_date" BIGINT NOT NULL,
    "credit_limit" BIGINT NOT NULL,
    "over_due_date_day" INTEGER NOT NULL,
    "last_payment" BIGINT NOT NULL,
    "latest_payment_amt" BIGINT NOT NULL,
    "npls_writeoff_flag" VARCHAR(100) NOT NULL,
    "npl_date" BIGINT NOT NULL,
    "writeoff_date" BIGINT NOT NULL,
    "start_follow_date" BIGINT NOT NULL,
    "end_follow_date" BIGINT NOT NULL,
    "staff_flag" VARCHAR(100) NOT NULL,
    "branch_owner" VARCHAR(100) NOT NULL,

    CONSTRAINT "credit_card_pkey" PRIMARY KEY ("cif")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" BIGSERIAL NOT NULL,
    "chn" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "user" VARCHAR(100) NOT NULL,
    "completed" BOOLEAN DEFAULT false,
    "oalist" VARCHAR(200) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "debt_cid_key" ON "debt"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "debt_address_cid_key" ON "debt_address"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "cus_cif_key" ON "cus"("cif");

-- CreateIndex
CREATE UNIQUE INDEX "cus_address_cif_key" ON "cus_address"("cif");

-- CreateIndex
CREATE UNIQUE INDEX "cob_cid_key" ON "cob"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "trn_cid_key" ON "trn"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "odt_cid_key" ON "odt"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "sod_cid_key" ON "sod"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "credit_card_cif_key" ON "credit_card"("cif");

-- CreateIndex
CREATE UNIQUE INDEX "todo_name_key" ON "todo"("name");

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_oa_id_fkey" FOREIGN KEY ("oa_id") REFERENCES "oa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oa_capability" ADD CONSTRAINT "oa_capability_oa_id_fkey" FOREIGN KEY ("oa_id") REFERENCES "oa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_oa_id_fkey" FOREIGN KEY ("oa_id") REFERENCES "oa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debt" ADD CONSTRAINT "debt_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
