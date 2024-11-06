export interface ApiResponseBody {
  name: string;
  id: string;
  status: string;
}

export interface ListStudentsFromClassByIdServiceInput {
  urlBase: string;
  classId: string;
}

export type ListStudentsFromClassByIdServiceResult = ApiResponseBody[];

export type ListStudentsFromClassByIdService = (
  params: ListStudentsFromClassByIdServiceInput,
) => Promise<ListStudentsFromClassByIdServiceResult>;
