import { now, getLocalTimeZone } from '@internationalized/date';
import { Status } from '@prisma/client';

export const TODO_STATUSES = Object.values(Status);
export const TODO_CREATE_DEFAULTS = {
  title: '',
  status: TODO_STATUSES[0],
  dueDate: now(getLocalTimeZone()),
};
