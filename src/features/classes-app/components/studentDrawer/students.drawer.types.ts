import { UseListStudentsFromClassByIdResult } from "../../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.types";

export interface DrawerProps {
  student: UseListStudentsFromClassByIdResult;
  showDrawer: () => void;
  shouldRefetch: () => void;
}

export interface Errors {
  name: string;
  error: boolean;
  errorMessage: string;
}
