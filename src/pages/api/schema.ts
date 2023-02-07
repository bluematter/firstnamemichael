import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';

import models from './models';
import mutations from './mutations';
import db from './prisma';
import queries from './queries';
import type PrismaTypes from '../../../prisma/generated';

interface ISchema {
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Output: Date;
      Input: Date;
    };
    Json: {
      Output: unknown;
      Input: unknown;
    };
  };
}

export type IBuilder = PothosSchemaTypes.SchemaBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<ISchema>
>;

const builder: IBuilder = new SchemaBuilder<ISchema>({
  plugins: [PrismaPlugin, SimpleObjectsPlugin],
  prisma: {
    client: db,
  },
});

// not really sure yet
builder.queryType({});
builder.mutationType({});

// base
models(db, builder);
queries(db, builder);
mutations(db, builder);

// not really sure yet
builder.addScalarType('Json', JSONResolver, {});
builder.addScalarType('DateTime', DateTimeResolver, {});

export const schema = builder.toSchema({});
