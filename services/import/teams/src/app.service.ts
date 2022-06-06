import { Injectable } from '@nestjs/common';
import { PrismaService } from '@share/modules/prisma/prisma.service';
import { TDebt_AddressRaw } from '@share/types/debt_address.interface';
import { userInfo } from 'os';
import { ITodo } from './utils/todo.interface';
@Injectable()
export class TodoService {
  constructor(private db: PrismaService) {}

  findAll(): Promise<any> {
    return this.db.findAll();
  }

  findOne(id: number){
    return `this actions returns a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addToDb(userData: ITodo) {
    console.log(userData);
    console.log(userData.chn);
    let user = null;
    const dataInsert = {
      ...userData,
      oalist: JSON.stringify(userData.oalist),
    };
    await this.db.$transaction(
      async (db) => {
        user = await db.todo.findUnique({
          where: {
            name: dataInsert.name,
          },
        });
      },
      { timeout: 200000 },
    );
    if (user) {
      console.log("update =>")
      await this.db.$transaction(
        async (db) => {
          await db.todo.update({
            where: {
              name: user.name,
            },
            data: dataInsert,
          });
        },
        { timeout: 200000 },
      );
    } else {
      console.log("create =>")
      await this.db.$transaction(
        async (db) => {
          await db.todo.create({ data: dataInsert });
        },
        { timeout: 200000 },
      );
    }
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
}
