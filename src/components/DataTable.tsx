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
    TableSortLabel,
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

const continentCodeMap: Record<string, string> = {
    'Africa': 'AF',
    'North America': 'NA',
    'Oceania': 'OC',
    'Antarctica': 'AN',
    'Asia': 'AS',
    'Europe': 'EU',
    'South America': 'SA',
};

const DataTable: React.FC = () => {
    const [continentFilter, setContinentFilter] = useState<string>('');
    const [hasStatesFilter, setHasStatesFilter] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState<string>('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [allData, setAllData] = useState<DataRow[]>(CountryData.countries);

    const filterContinent = (continent: string) => {
        setContinentFilter(continent);

        if (continent === "All") {
            setAllData(CountryData.countries);
        } else {
            setAllData(CountryData.countries.filter((row) => row.continent === continentCodeMap[continent]));
        }
    };

    const handleContinentChange = (event: SelectChangeEvent<string>) => {
        filterContinent(event.target.value);
    };

    const handleSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    const createSortHandler = (property: string) => () => {
        handleSort(property);
    };

    const filteredData = CountryData.countries
        .filter((row: DataRow) =>
            (row.continent.toLowerCase().includes(continentFilter.toLowerCase()) || continentFilter === '') &&
            (row.hasStates.toString() === hasStatesFilter || hasStatesFilter === '')
        )
        .sort((a: DataRow, b: DataRow) => {
            if (orderBy === 'nameUn') {
                return order === 'asc'
                    ? a.nameUn.localeCompare(b.nameUn)
                    : b.nameUn.localeCompare(a.nameUn);
            }
            if (orderBy === 'continent') {
                return order === 'asc'
                    ? a.continent.localeCompare(b.continent)
                    : b.continent.localeCompare(a.continent);
            }
            if (orderBy === 'hasStates') {
                return order === 'asc'
                    ? a.hasStates.toString().localeCompare(b.hasStates.toString())
                    : b.hasStates.toString().localeCompare(a.hasStates.toString());
            }

            return 0;
        });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const slicedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <FormControl style={{ minWidth: '200px', margin: '10px' }}>
                <InputLabel>Continent</InputLabel>
                <Select value={continentFilter} onChange={handleContinentChange}>
                    <MenuItem value="">All</MenuItem>
                    {Object.keys(continentCodeMap).map((continent) => (
                        <MenuItem key={continentCodeMap[continent]} value={continentCodeMap[continent]}>
                            {continent}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl style={{ minWidth: '200px', margin: '10px' }}>
                <InputLabel>Has States</InputLabel>
                <Select value={hasStatesFilter} onChange={(event) => setHasStatesFilter(event.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'nameUn'}
                                    direction={orderBy === 'nameUn' ? order : 'asc'}
                                    onClick={createSortHandler('nameUn')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'continent'}
                                    direction={orderBy === 'continent' ? order : 'asc'}
                                    onClick={createSortHandler('continent')}
                                >
                                    Continent
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'hasStates'}
                                    direction={orderBy === 'hasStates' ? order : 'asc'}
                                    onClick={createSortHandler('hasStates')}
                                >
                                    Has States
                                </TableSortLabel>
                            </TableCell>
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
