import { useEffect, useState } from 'react';
import { listProfessorClassesByIdService } from "../../services/list-professor-classes-by-id/list-professor-classes-by-id.service";
import { UseListProfessorClassesByIdProps, UseListProfessorClassesByIdResult } from "./use-list-professor-classes-by-id.types";

export const useListProfessorClassesById = ({ professorId }: UseListProfessorClassesByIdProps) => {
  const [result, setResult] = useState<UseListProfessorClassesByIdResult[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await listProfessorClassesByIdService({
          urlBase: 'http://localhost:8080',
          professorId,
        });

        setResult(response);
      } catch (err) {
        console.log(err)
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (professorId) {
      fetchClasses();
    }
  }, [professorId]);

  return { result, loading, error };
}