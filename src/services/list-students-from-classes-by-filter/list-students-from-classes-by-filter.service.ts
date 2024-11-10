import axios from "axios";
import {
  ListStudentsFromClassByIdService,
  ListStudentsFromClassByIdServiceResult,
} from "./list-professor-classes-by-id.types";

export const listStudentsFromClassByIdService: ListStudentsFromClassByIdService =
  async ({ urlBase, classId }) => {
    const { data } = await axios.get<ListStudentsFromClassByIdServiceResult>(
      `${urlBase}/class/${classId}/students`
    );

    return data;
  };
