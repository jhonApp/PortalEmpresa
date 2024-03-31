import React, { useState, useEffect } from 'react';
import PopupDialog from './dialog';

import AgendamentoVisitante from './Agendamento/AgendamentoVisitante';
import AgendamentoVisitanteEspecial from './Agendamento/AgendamentoVisitanteEspecial';
import AgendamentoPrestador from './Agendamento/AgendamentoPrestador';
import AgendamentoMassa from './Agendamento/AgendamentoMassa';

function PopupManager({ open, handleClose, type, data, action, title, description, atualizaLista }) {
  const handleClosePopup = () => {
    handleClose();
  };

  const renderContent = () => {
    switch (type) {
      case 'Visitante Simples':
        return <AgendamentoVisitante onClose={handleClosePopup} updateTable={atualizaLista} data={data} action={action}/>;
      case 'Visitante Especial':
        return <AgendamentoVisitanteEspecial onClose={handleClosePopup} updateTable={atualizaLista} data={data} action={action}/>;
      case 'Prestador de Serviço':
        return <AgendamentoPrestador onClose={handleClosePopup} updateTable={atualizaLista} data={data} action={action}/>;
      case 'Múltiplos Visitantes':
        return <AgendamentoMassa onClose={handleClosePopup} updateTable={atualizaLista} data={data} action={action}/>;
      default:
        return null;
    }
  };

  return (
    <>
      <PopupDialog
        open={open}
        handleClose={handleClosePopup}
        title={title}
        description={description}
        renderContent={renderContent}
        visible={false}
      />
    </>
  );
};


export default PopupManager;