import { Injectable } from '@nestjs/common';
import { PrismaService } from '@share/modules/prisma/prisma.service';
import { TDebt, TDebtRaw } from '@share/types/debt.interface';
import {
  TDebt_Address,
  TDebt_AddressRaw,
} from '@share/types/debt_address.interface';
import {
  TCus_Address,
  TCus_AddressRaw,
} from '@share/types/cus_address.interface';
import { TCob, TCobRaw } from '@share/types/cob.interface';
import { TTrn, TTrnRaw } from '@share/types/trn.interface';
import { TCus, TCusRaw } from '@share/types/cus.interface';
import { TOdt, TOdtRaw } from '@share/types/odt.interface';
import { TSod, TSodRaw } from '@share/types/sod.interface';

@Injectable()
export class ImportService {
  constructor(private db: PrismaService) {}

  async saveToDb(data: TDebtRaw[]) {
    let counts = 0;
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.debt.findUnique({
            where: {
              cid: Number(v.CID),
            },
          });
        },
        {
          maxWait: 5000000, // default: 2000
          timeout: 2000000, // default: 5000
        },
      );
      if (v.CHN === 'OD') {
        console.log(JSON.stringify(v.CHN));
        //insert
        const {
          CID: cid,
          CIF: cif,
          // IRN: intnow,
          // ZFWOD: writeoffdate,
          // BAL: principleamt,
          // ACR: intaccrued,
          // // ZFWOF: zfwof,
          // PROVCAT: accountlevel,
          ...detail
        } = v;

        items = {
          status: 'INIT',
          chn: v.CHN.toString(),
          cid: Number(v.CID),
          // intnow: Number(v.IRN),
          cif: Number(v.CIF),
          // writeoffdate: Number(v.ZFWOD),
          // // zfwof,
          // principleamt: Number(v.BAL),
          // intaccrued: Number(v.ACR),
          // accountlevel: Number(v.PROVCAT),
          detail: detail as any,
        };
      }

      if (v.CHN === 'LOAN') {
        console.log(JSON.stringify(v.CHN));
        const {
          CID: cid,
          CARDNO: cardno,
          CIF: cif,
          SUBT: productcode,
          SUBT_DESC: productdesc,
          ZMKTCD: subproductcode,
          ZMKTCD_DESC: subproductdesc,
          DTNT: contractsigndate,
          MDT: contractEnddate,
          CRLMT: approveamt,
          PMT: installmentamt,
          SCHNUM: schinstallment,
          ONP: period,
          LPDT: lastpaymentdate,
          GTDUE: overdueamt,
          CNTCR: paidperiod,
          DIST1FRE: payseq,
          INDEX: int,
          PCTO: intdefault,
          IRN: intnow,
          DLCAF: intstatus,
          BAL: principleamt,
          ACR: intaccrued,
          LCHG: intCharge,
          PONPT: closepayamt,
          POIF: closeintamt,
          POVALD: calclosedate,
          ZFWOS: accountIdentify,
          PROVCAT: accountlevel,
          ZFWOD: writeoffdate,
          ZSUBAC: subaccstatus,
          ZMASTER: masteracc,
          STAT: accountstatus,
          STAT_DESC: accountstatusdesc,
          ZDELPERM: zdelperm,
          ZOBFP: zobfp,
          ZOBFI: zobfi,
          OSEQDT: oseqdt,
          BOO: ownerBranchCode,
          BOO_DESC: ownerBranchDesc,

          ...detail
        } = v;

        items = {
          status: 'INIT',
          chn: v.CHN.toString(),
          cid: Number(v.CID),
          cardno,
          cif: Number(v.CIF),
          productcode: v.SUBT.toString(),
          productdesc: v.SUBT_DESC.toString(),
          subproductcode: v.ZMKTCD.toString(),
          subproductdesc: v.ZMKTCD_DESC.toString(),
          contractsigndate: Number(v.DTNT),
          contractEnddate: Number(v.MDT),
          approveamt: Number(v.CRLMT),
          installmentamt: Number(v.PMT),
          schinstallment: Number(v.SCHNUM),
          period: +period,
          lastpaymentdate: Number(v.LPDT),
          // currentbalance: +currentbalance,
          overdueamt: Number(v.GTDUE),
          paidperiod: Number(v.CNTCR),
          payseq: v.DIST1FRE.toString(),
          int: v.INDEX.toString(),
          intdefault: Number(v.PCTO),
          intnow: Number(v.IRN),
          intstatus: v.DLCAF.toString(),
          principleamt: Number(v.BAL),
          intaccrued: Number(v.ACR),
          intCharge: Number(v.LCHG),
          closepayamt: Number(v.PONPT),
          closeintamt: Number(v.POIF),
          calclosedate: Number(v.POVALD),
          accountIdentify: v.ZFWOS.toString(),
          accountlevel: Number(v.PROVCAT),
          writeoffdate: Number(v.ZFWOD),
          subaccstatus: v.ZSUBAC.toString(),
          masteracc: Number(v.ZMASTER),
          accountstatus: Number(v.STAT),
          accountstatusdesc: v.STAT_DESC.toString(),
          zdelperm: v.ZDELPERM.toString(),
          zobfp: v.ZOBFP.toString(),
          zobfi: v.ZOBFI.toString(),
          oseqdt: v.OSEQDT.toString(),
          ownerBranchCode: Number(v.BOO),
          ownerBranchDesc: v.BOO_DESC.toString(),
          detail: detail as any,
        };
      }
      counts++;
      console.log({ counts });
      // console.log({ items });
      console.log(JSON.stringify(user));
      if (user) {
        //update
        try {
          console.log('update');
          await this.db.$transaction(
            async (db) => {
              await db.debt.update({
                where: {
                  id: user.id,
                },
                data: items,
              });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log('update ==>');
          console.log(JSON.stringify(v.CID));
        }
      } else {
        try {
          console.log('create');
          console.log(items.cid);
          await this.db.$transaction(
            async (db) => {
              await db.debt.create({ data: items });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log('create error ==>');
          console.log((error));
        }
      }
    });
    return true;
  }

  async savedebt_Address(data: TDebt_AddressRaw[]) {
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.debt_Address.findUnique({
            where: {
              cid: Number(v.CID),
            },
          });
        },
        { timeout: 200000 },
      );

      if (v.CHN === 'ACC') {
        console.log(JSON.stringify(v.CHN));
        const {
          CID: cid,
          CIF: cif,
          AD1: ad1,
          AD2: ad2,
          AD3: ad3,
          AD4: ad4,
          ZSDISTCD: zsdistcd,
          CITY: city,
          STATE: state,
          MZIP: mzip,

          ...detail
        } = v;

        items = {
          chn: v.CHN.toString(),
          cid: +cid,
          cif: +cif,
          ad1: v.AD1.toString(),
          ad2: v.AD2.toString(),
          ad3: v.AD3.toString(),
          ad4: v.AD4.toString(),
          zsdistcd: v.ZSDISTCD.toString(),
          city: v.CITY.toString(),
          state: v.STATE.toString(),
          mzip: v.MZIP.toString(),

          detail: detail as any,
        };
      }

      console.log(`==> ${JSON.stringify(user)}`);
      if (user) {
        //update
        await this.db.$transaction(
          async (db) => {
            await db.debt_Address.update({
              where: {
                id: user.id,
              },
              data: items,
            });
          },
          { timeout: 200000 },
        );
        return;
      }
      console.log(`items ==> ${items}`);

      await this.db.$transaction(
        async (db) => {
          await db.debt_Address.create({ data: items });
        },
        { timeout: 200000 },
      );
    });
    return true;
  }

  async saveCus(data: TCusRaw[]) {
    let counts = 0;
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.cus.findUnique({
            where: {
              cif: Number(v.CIF),
            },
          });
        },
        {
          maxWait: 5000000, // default: 2000
          timeout: 2000000, // default: 5000
        },
      );

      if (v.CHN === 'LOAN') {
        console.log(JSON.stringify(v.CHN));
        const {
          CIF: cif,
          ZTITLE: ztitle,
          FNAME: fname,
          LNM: lnm,
          ZCIZID: zcizid,
          DOB: dob,
          SEX: sex,
          ZOCC: zocc,
          ZOCC_DESC: zocc_desc,
          ZSOCC: zsocc,
          ZSOCC_DESC: zsocc_desc,
          ZOCC2: zocc2,
          ZOCC2_DESC: zocc2_desc,
          ZSOCC2: zsocc2,
          ZSOCC2_DESC: zsocc2_desc,
          HPH: hph,
          BPH: bph,
          APH: aph,

          ...detail
        } = v;

        items = {
          chn: v.CHN.toString(),
          cif: Number(v.CIF),
          ztitle: v.ZTITLE.toString(),
          fname: v.FNAME.toString(),
          lnm: v.LNM.toString(),
          zcizid: Number(v.ZCIZID),
          dob: Number(v.DOB),
          sex: v.SEX.toString(),
          zocc: Number(v.ZOCC),
          zocc_desc: v.ZOCC_DESC.toString(),
          zsocc: Number(v.ZSOCC),
          zsocc_desc: v.ZSOCC_DESC.toString(),
          zocc2: Number(v.ZOCC2),
          zocc2_desc: v.ZOCC2_DESC.toString(),
          zsocc2: Number(v.ZSOCC2),
          zsocc2_desc: v.ZSOCC2.toString(),
          hph: Number(v.HPH),
          bph: Number(v.BPH),
          aph: Number(v.APH),

          detail: detail as any,
        };
      }
      counts++;
      console.log({ counts });
      if (user) {
        //update
        try {
          console.log('update');
          await this.db.$transaction(
            async (db) => {
              await db.cus.update({
                where: {
                  id: user.id,
                },
                data: items,
              });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(error);
        }
      } else {
        try {
          console.log('create');
          await this.db.$transaction(
            async (db) => {
              await db.cus.create({ data: items });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(error);
        }
      }
    });
    return true;
  }

  async savecus_Address(data: TCus_AddressRaw[]) {
    data.map(async (v) => {
      console.log(data);

      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.cus_Address.findUnique({
            where: {
              cif: Number(v.CIF),
            },
          });
        },
        { timeout: 200000 },
      );

      if (v.CHN === 'HM') {
        console.log(JSON.stringify(v.CHN));
        const {
          CIF: cif,
          PAD1: pad1,
          PAD2: pad2,
          PAD3: pad3,
          PAD4: pad4,
          ZPSDISCD: zpsdiscd,
          PCITY: pcity,
          PSTATE: pstate,
          PZIP: pzip,
          MAD1: mad1,
          MAD2: mad2,
          MAD3: mad3,
          MAD4: mad4,
          ZMSDISCD: zmsdiscd,
          MCITY: mcity,
          MSTATE: mstate,
          MZIP: mzip,
          ...detail
        } = v;

        items = {
          chn: v.CHN.toString(),
          cif: +cif,
          pad1: +pad1,
          pad2: +pad2,
          pad3: +pad3,
          pad4: +pad4,
          zpsdiscd: +zpsdiscd,
          pcity: +pcity,
          pstate: +pstate,
          pzip: +pzip,
          mad1: v.MAD1.toString(),
          mad2: +mad2,
          mad3: +mad3,
          mad4: +mad4,
          zmsdiscd: +zmsdiscd,
          mcity: +mcity,
          mstate: +mstate,
          mzip: +mzip,
          detail: detail as any,
        };
      }

      console.log(`==> ${JSON.stringify(user)}`);
      if (user) {
        //update
        await this.db.$transaction(
          async (db) => {
            await db.cus_Address.update({
              where: {
                id: user.id,
              },
              data: items,
            });
          },
          { timeout: 200000 },
        );
        return;
      }
      console.log(`items ==> ${items}`);

      await this.db.$transaction(
        async (db) => {
          await db.cus_Address.create({ data: items });
        },
        { timeout: 200000 },
      );
    });
    return true;
  }

  async saveCob(data: TCobRaw[]) {
    let counts = 0;
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.cob.findUnique({
            where: {
              cid: Number(v.CID),
            },
          });
        },
        {
          maxWait: 5000000, // default: 2000
          timeout: 2000000, // default: 5000
        },
      );
      if (v.CHN === 'LOAN') {
        console.log(JSON.stringify(v.CHN));
        const { CID: cid, CIF: cif, ...detail } = v;

        items = {
          chn: v.CHN.toString(),
          cid: Number(cid),
          cif: Number(cif),
          detail: detail as any,
        };
      }
      counts++;
      console.log({ counts });
      if (user) {
        //update
        try {
          console.log('update');
          await this.db.$transaction(
            async (db) => {
              await db.cob.update({
                where: {
                  id: user.id,
                },
                data: items,
              });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log('update ==>');
          console.log(JSON.stringify(v.CID));
        }
      } else {
        try {
          console.log('create');
          await this.db.$transaction(
            async (db) => {
              await db.cob.create({ data: items });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log('create ==>');
          console.log(JSON.stringify(v.CID));
        }
      }
      return;
    });
    return true;
  }

  async saveTrn(data: TTrnRaw[]) {
    let counts = 0;
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.trn.findUnique({
            where: {
              cid: Number(v.CID),
            },
          });
        },
        {
          maxWait: 5000000, // default: 2000
          timeout: 2000000, // default: 5000
        },
      );
      if (v.CHN === 'LOAN') {
        console.log(JSON.stringify(v.CHN));
        const {
          CID: cid,
          TSEQ: tseq,
          ETC: etc,
          TJD: tjd,
          TIME: time,
          TOT: tot,
          ENDBAL: endbal,
          EFD: efd,

          ...detail
        } = v;

        items = {
          chn: v.CHN.toString(),
          cid: Number(v.CID),
          tseq: Number(v.TSEQ),
          etc: v.ETC.toString(),
          tjd: Number(v.TJD),
          time: v.TIME.toString(),
          tot: Number(v.TOT),
          endbal: Number(v.ENDBAL),
          efd: Number(v.EFD),

          detail: detail as any,
        };
      }
      counts++;
      console.log({ counts });
      if (user) {
        //update
        try {
          console.log('update');
          await this.db.$transaction(
            async (db) => {
              await db.trn.update({
                where: {
                  id: user.id,
                },
                data: items,
              });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(JSON.stringify(v.CID));
        }
      } else {
        try {
          console.log('create');
          await this.db.$transaction(
            async (db) => {
              await db.trn.create({ data: items });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(JSON.stringify(v.CID));
        }
      }
    });
    return true;
  }

  async saveOdt(data: TOdtRaw[]) {
    let counts = 0;
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.oDT.findUnique({
            where: {
              cid: Number(v.CID),
            },
          });
        },
        {
          maxWait: 5000000, // default: 2000
          timeout: 2000000, // default: 5000
        },
      );
      if (v.CHN === 'LOAN') {
        console.log(JSON.stringify(v.CHN));
        const {
          CID: cid,
          SEQ: seq,
          ODTYP: odtyp,
          ODTYP_DESC: odtyp_desc,
          STDT: stdt,
          EXPDT: expdt,
          CLAMT: clamt,
          ACTIVATE: activate,
          RATECMP: ratecmp,
          ...detail
        } = v;

        items = {
          chn: v.CHN.toString(),
          cid: Number(v.CID),
          seq: Number(v.SEQ),
          odtyp: Number(v.CID),
          odtyp_desc: v.ODTYP_DESC.toString(),
          stdt: Number(v.STDT),
          expdt: Number(v.EXPDT),
          clamt: Number(v.CLAMT),
          activate: Number(v.ACTIVATE),
          ratecmp: Number(v.RATECMP),
          detail: detail as any,
        };
      }
      counts++;
      console.log({ counts });
      if (user) {
        //update
        try {
          console.log('update');
          await this.db.$transaction(
            async (db) => {
              await db.oDT.update({
                where: {
                  id: user.id,
                },
                data: items,
              });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(JSON.stringify(v.CID));
        }
      } else {
        try {
          console.log('create');
          await this.db.$transaction(
            async (db) => {
              await db.oDT.create({ data: items });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(JSON.stringify(v.CID));
        }
      }
    });
    return true;
  }

  async saveSod(data: TSodRaw[]) {
    let counts = 0;
    data.map(async (v) => {
      let items = null;
      let user = null;

      await this.db.$transaction(
        async (db) => {
          user = await db.sOD.findUnique({
            where: {
              cid: Number(v.CID),
            },
          });
        },
        {
          maxWait: 5000000, // default: 2000
          timeout: 2000000, // default: 5000
        },
      );
      if (v.CHN === 'LOAN') {
        console.log(JSON.stringify(v.CHN));
        const {
          CID: cid,
          CIF: cif,
          IRN: irn,
          TLD: tld,
          ZFWOS: zfwos,
          ZFWOD: zfwod,
          ZSTATCD: zstatcd,
          ZSTATCD_DESC: zstatcd_desc,
          BAL: bal,
          ZCLTOT: zcltot,
          ZINTDEL: zintdel,
          ZDELPRIN: zdelprin,
          ZDLPRD: zdlprd,
          ZEXPDT: zexpdt,
          ACR: acr,
          NEGACR: negacr,
          NEGACRUN: negacrun,
          DARCLS: darcls,
          DARCOVR: darcovr,
          PROVCAT: provcat,
          BOO: boo,
          BOO_DESC: boodesc,
          ...detail
        } = v;

        items = {
          chn: v.CHN.toString(),
          cid: Number(v.CID),
          cif: Number(v.CIF),
          irn: Number(v.IRN),
          tld: Number(v.TLD),
          zfwos: Number(v.ZFWOS),
          zfwod: Number(v.ZFWOD),
          zstatcd: Number(v.ZSTATCD),
          zstatcd_desc: v.ZSTATCD_DESC.toString(),
          bal: Number(v.BAL),
          zcltot: Number(v.ZCLTOT),
          zintdel: Number(v.ZINTDEL),
          zdelprin: Number(v.ZDELPRIN),
          zdlprd: Number(v.ZDLPRD),
          zexpdt: Number(v.ZEXPDT),
          acr: Number(v.ACR),
          negacr: Number(v.NEGACR),
          negacrun: Number(v.NEGACRUN),
          darcls: Number(v.DARCLS),
          darcovr: Number(v.DARCOVR),
          provcat: Number(v.PROVCAT),
          boo: Number(v.BOO),
          boo_desc: v.BOO_DESC.toString(),
          detail: detail as any,
        };
      }
      counts++;
      console.log({ counts });
      if (user) {
        //update
        try {
          console.log('update');
          await this.db.$transaction(
            async (db) => {
              await db.sOD.update({
                where: {
                  id: user.id,
                },
                data: items,
              });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(JSON.stringify(v.CID));
        }
      } else {
        try {
          console.log('create');
          await this.db.$transaction(
            async (db) => {
              await db.sOD.create({ data: items });
            },
            {
              maxWait: 5000000, // default: 2000
              timeout: 2000000, // default: 5000
            },
          );
        } catch (error: any) {
          console.log(JSON.stringify(v.CID));
        }
      }
    });
    return true;
  }
}
