import React, { useState, useEffect } from 'react';
import MenuCargo from './Header';
import SecaoCargo from './SecaoCargo';
import {listarDepartamento, getCargo, getSetor} from '../../../service/departamentoSetorService';

function Cargo() {
  const [setorData, setSetorData] = useState([]);
  const [cargoData, setCargoData] = useState([]);
  const [departamentoData, setDepartamentoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  const atualizaDepartamento = async () => {
    try {
      await listarDepartamento(setDepartamentoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de departamentos:', error);
    }
  };

  const atualizaSetor = async () => {
    try {
      await getSetor(setSetorData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de setores:', error);
    }
  };

  const atualizaCargo = async () => {
    try {
      await getCargo(setCargoData, setLoading, setValid);
    } catch (error) {
      console.error('Erro ao atualizar tabela de cargos:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizaDepartamento();
      await atualizaSetor();
      await atualizaCargo();
    };
    fetchData();
  }, []);

  return (
    <div>
      <MenuCargo atualizarCargo={atualizaCargo} />
      <SecaoCargo
        setorData={setorData}
        departamentoData={departamentoData}
        cargoData={cargoData}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
      />
    </div>
  );
}

export default Cargo;