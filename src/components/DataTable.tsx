import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TablePagination,
} from '@mui/material';
import CountryData from '../data/countryData.json';

type DataRow = {
  id: string;
  nameUn: string;
  name: string;
  code: string;
  continent: string;
  hasStates: boolean;
};

const DataTable: React.FC = () => {
  const [continentFilter, setContinentFilter] = useState<string>('');
  const [hasStatesFilter, setHasStatesFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = CountryData.countries.filter((row: DataRow) =>
    (row.continent.toLowerCase().includes(continentFilter.toLowerCase()) || continentFilter === '') &&
    (row.hasStates.toString() === hasStatesFilter || hasStatesFilter === '')
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleContinentChange = (event: SelectChangeEvent<string>) => {
    setContinentFilter(event.target.value);
  };

  const handleHasStatesChange = (event: SelectChangeEvent<string>) => {
    setHasStatesFilter(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ minWidth: '200px', margin: '10px' }}>
        <InputLabel>Continent</InputLabel>
        <Select value={continentFilter} onChange={handleContinentChange}>
          <MenuItem value="">All</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ minWidth: '200px', margin: '10px' }}>
        <InputLabel>Has States</InputLabel>
        <Select value={hasStatesFilter} onChange={handleHasStatesChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Continent</TableCell>
              <TableCell>Has States</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((row: DataRow) => (
              <TableRow key={row.id}>
                <TableCell>{row.nameUn}</TableCell>
                <TableCell>{row.continent}</TableCell>
                <TableCell>{row.hasStates ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DataTable;
