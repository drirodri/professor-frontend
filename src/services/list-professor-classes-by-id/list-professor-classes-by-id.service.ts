import axios from 'axios';
import {
  ListProfessorClassesByIdService,
  listProfessorClassesByIdServiceResult,
} from './list-professor-classes-by-id.types';

export const listProfessorClassesByIdService: ListProfessorClassesByIdService = async ({
  urlBase,
  professorId,
}) => {

  console.log('vai fazer a req:::');

  const { data } = await axios.get<listProfessorClassesByIdServiceResult>(
    `${urlBase}/professors/${professorId}/classes`,
  );

  console.log('RETORNO:::', data);

  return data;
};
