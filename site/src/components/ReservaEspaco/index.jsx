import React, { useState, useEffect } from 'react';
import Menu from './Header';
// import Pagination from './PaginaCartoes';

function ReservaEspaco() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Menu />
      {/* <Pagination
        cartaoData={cartaoData}
        loading={loading}
        setLoading={setLoading}
      /> */}
    </div>
  );
}

export default ReservaEspaco;