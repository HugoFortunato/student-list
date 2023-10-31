import styled from "styled-components";
import { useSchoolControl } from "./hooks/useSchoolControl";
import { useEffect, useState } from "react";
import { Trash, Pencil, Plus } from "@phosphor-icons/react";
import Modal from "react-modal";
import { FormModal } from "./FormModal";
import { StudentType } from "./contexts/SchoolControlProvider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h2``;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 1rem;
  width: 350px;
  height: auto;

  background: #fff;
  border-radius: 8px;
`;

const CardDescription = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  color: black;
`;

const StudentAttribute = styled.strong`
  font-size: 12px;
`;

const IconPlusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-left: 23rem;
`;

const IconHelpersContainer = styled.div`
  margin-left: auto;
`;

export enum StatusModal {
  Closed = 0,
  Editing = 1,
  Adding = 2,
}

function App() {
  const [statusModal, setStatusModal] = useState(StatusModal.Closed);
  const [alunoAtual, setAlunoAtual] = useState<StudentType | undefined>(
    undefined
  );
  const { getStudents, postStudent, putStudent, deleteStudent, students } =
    useSchoolControl();

  useEffect(() => {
    getStudents();
  }, []);

  const handleOnSalvar = (
    alunoEditado: StudentType,
    statusModalAtual: StatusModal
  ) => {
    setStatusModal(StatusModal.Closed);

    if (statusModalAtual === StatusModal.Adding) {
      postStudent(alunoEditado);

      return;
    }

    putStudent(alunoEditado);
  };

  const handleRequestClose = () => {
    setStatusModal(StatusModal.Closed);
  };

  const editarAluno = (item: StudentType) => {
    setStatusModal(StatusModal.Editing);
    setAlunoAtual(item);
  };

  const adicionarAluno = () => {
    setAlunoAtual(undefined);

    setStatusModal(StatusModal.Adding);
  };

  const excluirAluno = (id: number) => {
    deleteStudent(id);
  };

  return (
    <>
      <HeaderContainer>
        <Header>Controle Escolar</Header>
      </HeaderContainer>

      <IconPlusContainer>
        <Plus color="#fff" onClick={adicionarAluno} />
      </IconPlusContainer>

      <Modal
        isOpen={statusModal !== StatusModal.Closed}
        onRequestClose={handleRequestClose}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <FormModal
          statusModal={statusModal}
          alunoAtual={alunoAtual}
          onCloseModal={handleRequestClose}
          onSalvar={(alunoEditado, statusModalAtual) =>
            handleOnSalvar(alunoEditado, statusModalAtual)
          }
        />
      </Modal>

      <CardContainer>
        {students?.map((item, index) => (
          <Card key={index}>
            <CardDescription>
              <StudentAttribute>Nome: {item.nome} </StudentAttribute>
              <StudentAttribute>Idade: {item.idade} </StudentAttribute>
              <StudentAttribute>
                Nota 1° semestre: {item.notaPrimeiroSemestre}
              </StudentAttribute>
              <StudentAttribute>
                Nota 2° semestre: {item.notaSegundoSemestre}
              </StudentAttribute>
              <StudentAttribute>Professor: {item.professor}</StudentAttribute>
              <StudentAttribute>Sala: {item.sala} </StudentAttribute>
            </CardDescription>

            <IconHelpersContainer>
              <Pencil color="#000" onClick={() => editarAluno(item)} />
              <Trash color="#000" onClick={() => excluirAluno(item.id)} />
            </IconHelpersContainer>
          </Card>
        ))}
      </CardContainer>
    </>
  );
}

export default App;
