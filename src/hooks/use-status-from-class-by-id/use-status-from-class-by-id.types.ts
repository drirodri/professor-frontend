export interface UseClassId {
  classId: string;
}
export interface UseStatusFromClassByIdResult {
  status: string;
}

export type useStatusFromClassByIdHook = (
  params: UseClassId
) => UseStatusFromClassByIdResult;
