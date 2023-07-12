import _ from 'lodash';
import moment from 'moment';
import { AppDispatch } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import {
  addData,
  deleteData,
  getAllData,
  getDataById,
  updateData,
} from '../resources';

export const getAllNote =
  (query = '', overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.NOTES, query, overwrite)();

export const getNoteById =
  (id: number, query = '', overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.NOTES, id, query, overwrite)();

export const createNote =
  (payload: Note.Resource.Create['notes']) => (dispatch: AppDispatch) => {
    return addData(RESOURCE_NAME.NOTES)({
      ...payload,
      date: moment(payload.date).toISOString() as unknown as Date,
    })(dispatch);
  };

export const updateNote =
  (id: number, update: Note.Resource.Update['notes'], query = '') =>
  () =>
    updateData(RESOURCE_NAME.NOTES)(
      id,
      {
        ...update,
        ...(!_.isEmpty(update.date) && {
          date: moment(update.date).toISOString() as unknown as Date,
        }),
      },
      query
    )();

export const deleteNote =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.NOTES, id, noRequest)(dispatch);

export const DEFAULT_DOCUMENT_PROPS = {
  author: 'Apri Kurniawansyah',
  creator: 'Apri Kurniawansyah',
  producer: 'AKRVerz',
  subject: 'NOTES WEB',
};
