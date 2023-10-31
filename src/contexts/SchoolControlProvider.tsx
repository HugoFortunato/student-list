/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useState } from "react";

import { api } from "../services/api.ts";

export type StudentType = {
  id: number;
  nome: string;
  idade: number;
  notaPrimeiroSemestre: number;
  notaSegundoSemestre: number;
  professor: string;
  sala: number;
};

export type ChildrenType = {
  children: ReactNode;
};

export type Context = {
  getStudents: () => void;
  postStudent: (requestBody: StudentType) => void;
  putStudent: (requestBody: StudentType) => void;
  deleteStudent: (id: number) => void;
  students: StudentType[] | undefined;
};

export const SchoolControlContext = createContext<Context>({
  getStudents: () => {},
  postStudent: () => {},
  putStudent: () => {},
  deleteStudent: () => {},
  students: undefined,
});

export const SchoolControlProvider = ({ children }: ChildrenType) => {
  const [students, setStudents] = useState<StudentType[]>();

  async function getStudents(): Promise<StudentType | undefined> {
    try {
      const response = await api.get<StudentType[]>("/aluno");

      setStudents(response.data);

      return;
    } catch (err) {
      console.log(err);
    }
  }

  async function postStudent(requestBody: StudentType) {
    try {
      const { data } = await api.post<StudentType[]>("/aluno", requestBody);

      window.location.reload();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function putStudent(requestBody: StudentType) {
    try {
      const { data } = await api.put<StudentType[]>(
        `/aluno/${requestBody.id}`,
        requestBody
      );

      window.location.reload();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteStudent(id: number) {
    try {
      const { data } = await api.delete(`/aluno/${id}`);

      // window.location.reload();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SchoolControlContext.Provider
      value={{
        getStudents,
        postStudent,
        putStudent,
        deleteStudent,
        students,
      }}
    >
      {children}
    </SchoolControlContext.Provider>
  );
};
