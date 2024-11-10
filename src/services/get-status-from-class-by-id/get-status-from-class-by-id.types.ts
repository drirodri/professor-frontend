export interface ListStatusFromClassByIdServiceInput {
  classId: string;
}

export type ListClassStatusByIdService = (
  params: ListStatusFromClassByIdServiceInput
) => Promise<string>;
