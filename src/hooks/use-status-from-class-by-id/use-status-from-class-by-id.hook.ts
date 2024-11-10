import { useEffect, useState } from "react";
import { UseClassId } from "./use-status-from-class-by-id.types";
import { listClassStatusById } from "../../services/get-status-from-class-by-id/get-status-from-class-by-id.service";

export const useStatusFromClassById = ({ classId }: UseClassId) => {
  const [classStatus, setClassStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClassStatus = async () => {
      setLoading(true);

      try {
        const response = await listClassStatusById({ classId });
        setClassStatus(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (classId) {
      fetchClassStatus();
    }
  }, [classId]);

  return { classStatus, statusLoading: loading };
};
