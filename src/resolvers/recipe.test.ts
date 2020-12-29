import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../test-utils/testConn";
import { gCall } from "../test-utils/gCall";
import { User } from "../entities/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});
