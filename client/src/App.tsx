import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from './redux/Hooks';
import { getCustomersThunk } from './customers/CustomersThunk';
import { customersSelector } from './customers/CustomersSelector';
import { CustomersRequestType, CustomersType } from './customers/Customers';
import Grid from '@mui/material/Grid';
import SearchBar from './components/SearchBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddCustomerSideBar from './pages/AddCustomer';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', width: 150, },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200, sortable: false },
  { field: 'gender', headerName: 'Gender', width: 150, sortable: false },
];

const initialState: CustomersRequestType = { perPage: 5, page: 0, sortOrder: "asc", field: "firstName" };

const initialSortModel: GridSortModel = [{ field: 'firstName', sort: 'asc' }];

function App(): React.ReactElement {
  const dispatch = useAppDispatch();

  const customers: CustomersType[] = useAppSelector(customersSelector);

  const [state, setState] = useReducer(
    (prevState: CustomersRequestType, currentState: CustomersRequestType) => ({ ...prevState, ...currentState }),
    initialState
  );;

  const [sortModel, setSortModel] = React.useState<GridSortModel>(initialSortModel);

  useEffect(() => {
    dispatch(getCustomersThunk(state));
  }, [dispatch, state]);

  const handleSortModelChange = (sortedModel: GridSortModel) => {
    setSortModel(sortedModel);
    const [newModel] = sortedModel;
    setState({ field: newModel.field, sortOrder: newModel.sort as string });
  };

  const [toggleCustomerSideBar, setToggleCustomerSideBar] = useState(false);
  return (
    <div>
      <Grid container spacing={2} padding={10}>
        <Grid item md={8}>
          <SearchBar />
        </Grid>
        <Grid item md={4}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" startIcon={<Add />} onClick={() => setToggleCustomerSideBar(true)} />
            <Button variant="outlined" startIcon={<FilterAltIcon />} />
          </Stack>
        </Grid>
        <Grid item md={12}>
          <div style={{ height: 500, width: '100%' }}>
            {
              customers.length > 0 && <DataGrid rows={customers} columns={columns}
                sortingOrder={['asc', 'desc']}
                sortingMode="server"
                sortModel={sortModel}
                pageSize={state?.perPage}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newPageSize) => setState({ perPage: newPageSize })}
                onSortModelChange={handleSortModelChange} />
            }
          </div>
        </Grid>
      </Grid>
      <AddCustomerSideBar
        toggleCustomerSideBar={toggleCustomerSideBar}
        setToggleCustomerSideBar={setToggleCustomerSideBar} />
    </div>
  );
}

export default App;
