import _ from 'lodash';
import * as Yup from 'yup';
import { USER_ROLE } from './constant';

const isValidNumber = (value: number | undefined, greaterThan = 0) => {
  if (
    typeof value === 'undefined' ||
    typeof +value !== 'number' ||
    Number.isNaN(+value)
  )
    return false;

  return +value > greaterThan;
};

export const noteSchema = Yup.object({
  date: Yup.date().required('Date is Required'),
  tittle: Yup.string().required('Tittle is Required'),
  post: Yup.string().required('Post is Required'),
});
