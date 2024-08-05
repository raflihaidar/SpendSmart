
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.16.1
 * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
 */
Prisma.prismaVersion = {
  client: "5.16.1",
  engine: "34ace0eb2704183d2c05b60b52fba5c43c13f303"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  fullname: 'fullname',
  username: 'username',
  password: 'password',
  email: 'email',
  financial_record_id: 'financial_record_id'
};

exports.Prisma.RelationLoadStrategy = {
  query: 'query',
  join: 'join'
};

exports.Prisma.Financial_RecordScalarFieldEnum = {
  id: 'id',
  income: 'income',
  expense: 'expense',
  balance: 'balance',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  description: 'description',
  amount: 'amount',
  createdAt: 'createdAt',
  type_id: 'type_id',
  user_id: 'user_id',
  category_id: 'category_id'
};

exports.Prisma.TypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type_id: 'type_id',
  user_id: 'user_id'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  access_token: 'access_token',
  expires_at: 'expires_at',
  id_token: 'id_token',
  provider: 'provider',
  refresh_token: 'refresh_token',
  scope: 'scope',
  session_state: 'session_state',
  token_type: 'token_type',
  type: 'type'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  fullname: 'fullname',
  username: 'username',
  password: 'password',
  email: 'email',
  financial_record_id: 'financial_record_id'
};

exports.Prisma.Financial_RecordOrderByRelevanceFieldEnum = {
  id: 'id'
};

exports.Prisma.TransactionOrderByRelevanceFieldEnum = {
  id: 'id',
  description: 'description',
  user_id: 'user_id'
};

exports.Prisma.TypeOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.CategoryOrderByRelevanceFieldEnum = {
  name: 'name',
  user_id: 'user_id'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.accountOrderByRelevanceFieldEnum = {
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  access_token: 'access_token',
  id_token: 'id_token',
  provider: 'provider',
  refresh_token: 'refresh_token',
  scope: 'scope',
  session_state: 'session_state',
  token_type: 'token_type',
  type: 'type'
};


exports.Prisma.ModelName = {
  User: 'User',
  Financial_Record: 'Financial_Record',
  Transaction: 'Transaction',
  Type: 'Type',
  Category: 'Category',
  account: 'account'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/ralph/myProject/SpendSmart/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "fullTextIndex",
      "fullTextSearch",
      "relationJoins"
    ],
    "sourceFilePath": "/home/ralph/myProject/SpendSmart/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.16.1",
  "engineVersion": "34ace0eb2704183d2c05b60b52fba5c43c13f303",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"relationJoins\", \"fullTextSearch\", \"fullTextIndex\", \"driverAdapters\"]\n  output          = \"./generated/client\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id                  String           @id @default(uuid())\n  fullname            String           @unique @db.VarChar(100)\n  username            String           @unique @db.VarChar(20)\n  password            String           @db.VarChar(100)\n  email               String           @unique @db.VarChar(100)\n  financial_record_id String           @unique\n  account             account?\n  transaction         Transaction[]\n  category            Category[]\n  financial_record    Financial_Record @relation(fields: [financial_record_id], references: [id])\n\n  @@map(\"users\")\n}\n\nmodel Financial_Record {\n  id        String   @id @default(uuid())\n  income    Int\n  expense   Int\n  balance   Int\n  updatedAt DateTime @default(now())\n  user      User?\n\n  @@map(\"financial_records\")\n}\n\nmodel Transaction {\n  id          String   @id @default(uuid())\n  description String   @db.VarChar(100)\n  amount      Int\n  createdAt   DateTime @db.Date\n  type_id     Int\n  user_id     String   @db.VarChar(255)\n  category_id Int\n  category    Category @relation(fields: [category_id], references: [id])\n  type        Type     @relation(fields: [type_id], references: [id])\n  user        User     @relation(fields: [user_id], references: [id])\n\n  @@index([type_id], map: \"transactions_type_id_fkey\")\n  @@index([category_id], map: \"transactions_category_id_fkey\")\n  @@index([user_id], map: \"transactions_user_id_fkey\")\n  @@fulltext([description])\n  @@map(\"transactions\")\n}\n\nmodel Type {\n  id          Int           @id @default(autoincrement())\n  name        String        @db.VarChar(20)\n  Category    Category[]\n  Transaction Transaction[]\n\n  @@map(\"types\")\n}\n\nmodel Category {\n  id          Int           @id @default(autoincrement())\n  name        String        @db.VarChar(20)\n  type_id     Int\n  user_id     String\n  type        Type          @relation(fields: [type_id], references: [id])\n  user        User          @relation(fields: [user_id], references: [id])\n  transaction Transaction[]\n\n  @@index([type_id], map: \"categories_type_id_fkey\")\n  @@map(\"categories\")\n}\n\nmodel account {\n  id                Int      @id @default(autoincrement())\n  userId            String   @unique(map: \"Account_userId_key\")\n  providerAccountId String\n  createdAt         DateTime @default(now()) @db.DateTime(0)\n  updatedAt         DateTime @default(now()) @db.DateTime(0)\n  access_token      String?  @db.Text\n  expires_at        Int?\n  id_token          String?  @db.Text\n  provider          String\n  refresh_token     String?  @db.Text\n  scope             String?\n  session_state     String?\n  token_type        String?\n  type              String\n  users             User     @relation(fields: [userId], references: [id], onDelete: Cascade, map: \"Account_userId_fkey\")\n\n  @@unique([provider, providerAccountId], map: \"Account_provider_providerAccountId_key\")\n}\n",
  "inlineSchemaHash": "1a37b3642f40e2df561fc1857b3cb5de104c636dec610cca02112b5dcdf1d9ad",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fullname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"financial_record_id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"account\",\"kind\":\"object\",\"type\":\"account\",\"relationName\":\"UserToaccount\"},{\"name\":\"transaction\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"TransactionToUser\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToUser\"},{\"name\":\"financial_record\",\"kind\":\"object\",\"type\":\"Financial_Record\",\"relationName\":\"Financial_RecordToUser\"}],\"dbName\":\"users\"},\"Financial_Record\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"income\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"expense\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"balance\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"Financial_RecordToUser\"}],\"dbName\":\"financial_records\"},\"Transaction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"type_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user_id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToTransaction\"},{\"name\":\"type\",\"kind\":\"object\",\"type\":\"Type\",\"relationName\":\"TransactionToType\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TransactionToUser\"}],\"dbName\":\"transactions\"},\"Type\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToType\"},{\"name\":\"Transaction\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"TransactionToType\"}],\"dbName\":\"types\"},\"Category\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type_id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user_id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"object\",\"type\":\"Type\",\"relationName\":\"CategoryToType\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CategoryToUser\"},{\"name\":\"transaction\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"CategoryToTransaction\"}],\"dbName\":\"categories\"},\"account\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"access_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"id_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scope\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"session_state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token_type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToaccount\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    try {
      // try loading the Wasm module from a conditionally module tag
      const loader = (await import('#wasm-engine-loader')).default
      const engine = (await loader).default
      return engine
    } catch (e) {
      // if the conditional module tag is not found, load the Wasm module directly.
      // This will work on Cloudflare, but not on Vercel.
      if (e instanceof Error && e.message.includes('No such module')) {
        const engine = (await import('./query_engine_bg.wasm')).default
        return engine
      }
      throw e
    }
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

