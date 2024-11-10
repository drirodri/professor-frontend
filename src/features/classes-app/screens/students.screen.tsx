import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Drawer,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useListStudentsFromClassById } from "../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.hook";
import StudentDrawer from "../components/studentDrawer/students.drawer";
import { UseListStudentsFromClassByIdResult } from "../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.types";

export const StudentsScreen: React.FC = () => {
  const { classId } = useParams<{
    classId: string;
    professorId: string;
  }>();
  const navigate = useNavigate();
  const {
    result: studentsInfo,
    loading,
    error,
    shouldRefetch,
  } = useListStudentsFromClassById({ classId: classId! });

  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [studentToEvaluate, setStudent] =
    useState<UseListStudentsFromClassByIdResult>();

  const handleBackClick = () => {
    navigate("/");
  };

  const showDrawer = () => {
    setDrawerVisibility(!drawerVisibility);
  };

  return (
    <Box sx={{ padding: "40px" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <IconButton onClick={handleBackClick} sx={{ marginRight: "2px" }}>
          <ArrowBackIcon />
          <Typography variant="h6"> Voltar </Typography>
        </IconButton>
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", marginTop: "20px" }}
        >
          Alunos da Turma: {classId}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {studentToEvaluate && (
        <Drawer
          open={drawerVisibility}
          onClose={showDrawer}
          anchor="right"
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#ffffff",
              width: "400px",
            },
          }}
        >
          <StudentDrawer
            student={studentToEvaluate}
            showDrawer={showDrawer}
            shouldRefetch={shouldRefetch}
          />
        </Drawer>
      )}
      {studentsInfo && studentsInfo.length > 0 ? (
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
          {studentsInfo.map((student) => (
            <Box
              onClick={() => {
                setStudent(student);
                studentToEvaluate !== student
                  ? setDrawerVisibility(true)
                  : setDrawerVisibility(!drawerVisibility);
              }}
              key={student.id}
              sx={{
                width: { xs: "100%", sm: "45%", md: "30%" },
                padding: "1rem",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  cursor: "pointer",
                  // Add dynamic borders according to student's status
                  border: `${
                    student.status === "APROVADO"
                      ? "solid thin green"
                      : student.status === "EM_EXAME"
                      ? "solid thin yellow"
                      : student.status === "REPROVADO"
                      ? "solid thin red"
                      : "none"
                  }`,
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {student.name}
                  </Typography>
                  <Typography color="textSecondary">
                    RA: {student.id}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {student.status}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography>Nenhum aluno encontrado.</Typography>
      )}
    </Box>
  );
};
