import { UseListStudentsFromClassByIdResult } from "../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.types";

export interface EvaluationProps {
  aulas_lecionadas: number;
  aulas_atendidas: number;
  nota_p1: number;
  nota_p2: number;
}

export interface EvaluationData {
  student: UseListStudentsFromClassByIdResult;
  evaluation: EvaluationProps;
}

export interface ResponseType {
  status: string;
}

export type PostStudentEvaluationProps = (
  params: EvaluationData
) => Promise<ResponseType>;
