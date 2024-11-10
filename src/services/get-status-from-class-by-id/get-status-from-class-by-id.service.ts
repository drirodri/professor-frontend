import axios from "axios";
import { ListClassStatusByIdService } from "./get-status-from-class-by-id.types";

export const listClassStatusById: ListClassStatusByIdService = async ({
  classId,
}) => {
  const { data } = await axios.get<string>(
    `http://localhost:8080/class/${classId}/status`
  );

  return data;
};
