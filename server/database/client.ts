import { PrismaClient } from "@prisma/client";
import { connect } from "@tidbcloud/serverless";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import dotenv from "dotenv";

// setup
dotenv.config();
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env file");
} else {
  console.log("Connected");
}

// init prisma
const connection = connect({ url: connectionString });
const adapter = new PrismaTiDBCloud(connection);
export const prisma = new PrismaClient({ adapter });
