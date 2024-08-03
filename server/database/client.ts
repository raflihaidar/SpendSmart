import { PrismaClient, Prisma, Transaction } from "@prisma/client";
import { connect } from "@tidbcloud/serverless";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
// import { elasticsearchFTS } from "@prisma-fts/elasticsearch";
import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

// setup
dotenv.config();
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

// elasticsearch client
// const esClient = new Client({
//   node: "http://localhost:3000/api/transaction",
// });

// init prisma
const connection = connect({ url: connectionString });
const adapter = new PrismaTiDBCloud(connection);
export const prisma = new PrismaClient({ adapter });

// const middleware = elasticsearchFTS(esClient, Prisma.dmmf, {
//   Transaction: {
//     docId: "id",
//     indexes: {
//       description: "transaction_index",
//     },
//   },
// });

// prisma.$use(middleware);

// // Log successful initialization
// console.log("Prisma and Elasticsearch initialized successfully");
