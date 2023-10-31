import { useState, useEffect } from "react";
import { StatusModal } from "./App";
import { StudentType } from "./contexts/SchoolControlProvider";
import styled from "styled-components";
import { X } from "@phosphor-icons/react";

type Props = {
  statusModal: StatusModal;
  onSalvar: (aluno: StudentType, statusModal: StatusModal) => void;
  alunoAtual?: StudentType;
  onCloseModal: () => void;
};

const labels = [
  "Aluno:",
  "Idade:",
  "Nota 1° semestre:",
  "Nota 2° semestre:",
  "Professor:",
  "Sala:",
];
const template = {
  id: 0,
  nome: "",
  idade: 0,
  notaPrimeiroSemestre: 0,
  notaSegundoSemestre: 0,
  professor: "",
  sala: 0,
};

const FormTitle = styled.h5`
  color: #000;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  gap: 10px;

  color: #000;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonForm = styled.button`
  margin-top: 20px;
`;

const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormModal = ({
  statusModal,
  onSalvar,
  alunoAtual,
  onCloseModal,
}: Props) => {
  const [alunoEditado, setAlunoEditado] = useState<StudentType>(template);

  useEffect(() => {
    if (alunoAtual !== undefined) {
      setAlunoEditado(alunoAtual as StudentType);
    } else {
      setAlunoEditado(template);
    }
  }, []);

  const handleOnSalvar = (aluno: StudentType, statusModal: StatusModal) => {
    onSalvar(aluno, statusModal);
  };

  const salvarStatus = (
    campo: string,
    valor: string,
    isNumero: boolean = false
  ) => {
    setAlunoEditado({
      ...alunoEditado,
      [campo]: isNumero ? ~~valor : valor,
    });
  };

  return (
    <>
      <TopContent>
        <FormTitle>
          {statusModal === StatusModal.Adding
            ? "Adicionar Aluno"
            : "Editar aluno"}
        </FormTitle>

        <X color="#000" onClick={onCloseModal} />
      </TopContent>

      <FormContainer>
        {Object.keys(template)
          .filter((key) => key !== "id")
          .map((key, index) => (
            <FormContent>
              <label>{labels[index]}</label>
              <div key={index}>
                <input
                  onChange={(e) => salvarStatus(key, e.target.value)}
                  value={alunoEditado[key as keyof StudentType]}
                  type="text"
                />
              </div>
            </FormContent>
          ))}
      </FormContainer>

      <ButtonContainer>
        <ButtonForm onClick={() => handleOnSalvar(alunoEditado, statusModal)}>
          Salvar
        </ButtonForm>
        <ButtonForm onClick={onCloseModal}>Cancelar</ButtonForm>
      </ButtonContainer>
    </>
  );
};
