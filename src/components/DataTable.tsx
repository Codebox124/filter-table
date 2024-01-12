import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
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



    const filteredData = CountryData.countries.filter((row: DataRow) =>
        (row.continent.toLowerCase().includes(continentFilter.toLowerCase()) || continentFilter === '') &&
        (row.hasStates.toString() === hasStatesFilter || hasStatesFilter === '')
    );




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
                        {filteredData.map((row: DataRow) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.nameUn}</TableCell>
                                <TableCell>{row.continent}</TableCell>
                                <TableCell>{row.hasStates ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataTable;
