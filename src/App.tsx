// src/App.tsx
import React from 'react';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  return (
    <div>
      <h1 style= {{padding : "10px" }}>Filter Table</h1>
      <DataTable />
    </div>
  );
};

export default App;
