import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { DrawerProps, Errors } from "./students.drawer.types";
import { inputsArray } from "./students.drawer.data";
import { EvaluationData } from "../../../../services/post-student-evaluation/post-student-evaluation.types";
import { postStudentGrades } from "../../../../services/post-student-evaluation/post-student-evaluation.service";

function StudentDrawer({ student, showDrawer, shouldRefetch }: DrawerProps) {
  const [evaluationData, setEvaluationData] = useState<EvaluationData>({
    student: student,
    evaluation: {
      aulas_lecionadas: 0,
      aulas_atendidas: 0,
      nota_p1: 0,
      nota_p2: 0,
    },
  });

  // Errors state to make validation of form inputs
  // Name needs to be equal to input name for the validation logic to work

  const [errors, setErrors] = useState<Errors[]>([
    { name: "aulas_lecionadas", error: false, errorMessage: "" },
    { name: "aulas_atendidas", error: false, errorMessage: "" },
    { name: "nota_p1", error: false, errorMessage: "" },
    { name: "nota_p2", error: false, errorMessage: "" },
  ]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    let errorMessage = "";

    // Prevent error from showing on empty inputs, prevent non-numeric values
    if (value !== "") {
      if (isNaN(value)) {
        errorMessage = "Insira apenas números";
      } else if (value <= 0) {
        errorMessage = "Número deve ser maior que 0";
      }
    }
    // Prevent grades from going higher than 10
    if (name === "nota_p1" || name === "nota_p2") {
      if (value > 10) {
        errorMessage = "Nota não deve ser maior que 10";
      }
    }

    // Populate errors array
    setErrors((prevErrors) =>
      prevErrors.map((err) =>
        err.name === name
          ? {
              ...err,
              error:
                (value !== "" && (value <= 0 || isNaN(value))) ||
                ((name === "nota_p1" || name === "nota_p2") && value > 10),
              errorMessage,
            }
          : err
      )
    );

    // Create Evaluation Data to be submitted
    setEvaluationData((prevData) => ({
      ...prevData,
      evaluation: {
        ...prevData.evaluation,
        [name]: value,
      },
    }));
  };

  // error functions to apply the error logic to the inputs
  const isInputWrong = (name: string): boolean => {
    const findError = errors.find((err) => err.name === name);
    return findError ? findError.error : false;
  };
  const findErrorMessage = (name: string): string => {
    const findMessage = errors.find((err) => err.name === name);
    return findMessage ? findMessage.errorMessage : "";
  };

  // form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { aulas_atendidas, aulas_lecionadas, nota_p1, nota_p2 } =
      evaluationData.evaluation;

    // Prevent form submit while an error still exists
    if (errors.some((err) => err.error)) {
      alert("Insira apenas números maiores que 0");
      return;
    } else if (aulas_atendidas > aulas_lecionadas) {
      alert(
        "Quantidade de aulas atendidas não pode ser maior que aulas lecionadas"
      );
      return;
    } else if ((nota_p1 || nota_p2) > 10) {
      alert("Nota não deve ser maior que 10");
      return;
    }

    const response = await postStudentGrades(evaluationData);
    shouldRefetch(); // Trigger the refetch of students screen
    showDrawer(); // Close the drawer

    console.log(response);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px", marginTop: "20px" }}>
        Avaliação do Aluno
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        marginBottom="20px"
      >
        <Typography color="textPrimary" variant="h6">
          {student.name}
        </Typography>
        <Typography color="textSecondary" variant="subtitle1">
          Status: {student.status}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="80%"
      >
        {inputsArray.map((input, index) => (
          <TextField
            sx={{ width: "100%" }}
            key={input.name}
            error={isInputWrong(input.name)}
            name={input.name}
            type="number"
            label={input.label}
            id="outlined-required"
            helperText={findErrorMessage(input.name)}
            onChange={handleChange}
            required
            autoFocus={index === 0} // Focus first input
            slotProps={
              index > 1 // Add slotProps only to the grade inputs to handle proper grade values
                ? {
                    htmlInput: {
                      step: "0.1",
                      min: "0",
                      max: "10",
                    },
                  }
                : undefined
            }
          />
        ))}
        <Button type="submit" variant="contained">
          Lançar Notas e Frequência
        </Button>
      </Box>
    </Box>
  );
}

export default StudentDrawer;
