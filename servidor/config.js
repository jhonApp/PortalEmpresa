const configs = {
    development: {
      server: 'JHON-DELL01',
      database: 'DatabaseDetkPortalEmpresa',
      user: 'Jhon',
      password: 'admin',
      options: {
        trustServerCertificate: true, 
        encrypt: true,
      }
    },
    production: {
      server: '',
      database: '',
      user: '',
      password: '',
      options: {
        trustServerCertificate: true, 
        encrypt: true,
      }
    }
  };
  
  const environment = process.env.NODE_ENV || 'development';
  const selectedConfig = configs[environment];
  
  module.exports = selectedConfig;  