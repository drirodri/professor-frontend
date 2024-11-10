import { PostStudentEvaluationProps } from "./post-student-evaluation.types";
import axios from "axios";

export const postStudentGrades: PostStudentEvaluationProps = async ({
  student,
  evaluation,
}) => {
  let response;

  try {
    response = await axios.post(
      `http://localhost:8080/students/${student.id}/evaluation`,
      evaluation,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  return response?.data;
};
