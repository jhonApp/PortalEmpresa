import React, { useState, useEffect } from 'react';
import MenuCargo from './Header';
import SecaoCargo from './SecaoCargo';
import {listarDepartamento, getSetor} from '../../../service/departamentoSetorService';
import { getCargo } from '../../../service/cargoService';

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
      <MenuCargo atualizaCargo={atualizaCargo} cargoData={cargoData}/>
      <SecaoCargo
        setorData={setorData}
        departamentoData={departamentoData}
        cargoData={cargoData}
        atualizaCargo={atualizaCargo}
        atualizaSetor={atualizaSetor}
        atualizaDepartamento={atualizaDepartamento}
        loading={loading}
        setLoading={setLoading}
        isValid={isValid}
        setValid={setValid}
      />
    </div>
  );
}

export default Cargo;