import { useEffect, useState } from "react";
import { listStudentsFromClassByIdService } from "../../services/list-students-from-classes-by-filter/list-students-from-classes-by-filter.service";
import {
  UseListStudentsFromClassByIdProps,
  UseListStudentsFromClassByIdResult,
} from "./use-list-students-from-class-by-id.types";

export const useListStudentsFromClassById = ({
  classId,
}: UseListStudentsFromClassByIdProps) => {
  const [result, setResult] = useState<
    UseListStudentsFromClassByIdResult[] | null
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [refetch, setRefetch] = useState(false);

  // Function to trigger refetch when needed
  const shouldRefetch = () => {
    setRefetch((prevRefetch) => !prevRefetch);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await listStudentsFromClassByIdService({
          urlBase: "http://localhost:8080",
          classId,
        });

        setResult(response);
      } catch (err) {
        console.log(err);
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClasses();
    }
  }, [classId, refetch]);

  return { result, loading, error, shouldRefetch };
};
