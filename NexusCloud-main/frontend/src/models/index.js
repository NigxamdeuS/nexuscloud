// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { User, Lecture, Post, Comment, Event, Calendar: CalendarModel } = initSchema(schema);

export const Calendar = CalendarModel;

export {
  User,
  Lecture,
  Post,
  Comment,
  Event
};

export { schema };