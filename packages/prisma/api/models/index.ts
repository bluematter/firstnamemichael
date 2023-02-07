/* eslint-disable import/no-anonymous-default-export */
import User from './user';
import { IBuilder } from '../schema';
import { PrismaClient } from '../../../../prisma/client';

export default (db: PrismaClient, builder: IBuilder) => {
  User(db, builder);
};
