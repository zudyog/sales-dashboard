import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from './redux/Hooks';
import { getCustomersThunk } from './customers/CustomersThunk';
import { customersSelector } from './customers/CustomersSelector';
import { CustomersRequestType, CustomersType } from './customers/Customers';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', width: 150, },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200, sortable: false },
  { field: 'gender', headerName: 'Gender', width: 150, sortable: false },
];

const initialState: CustomersRequestType = { perPage: 10, page: 0, sortOrder: "asc", field: "firstName" };

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
    console.log("renders");
    dispatch(getCustomersThunk(state));
  }, [dispatch, state]);

  const handleSortModelChange = (sortedModel: GridSortModel) => {
    setSortModel(sortedModel);
    const [newModel] = sortedModel;
    setState({ field: newModel.field, sortOrder: newModel.sort as string });
  };

  return (
    <div style={{ height: 300, width: '100%' }}>
      {
        customers.length > 0 && <DataGrid rows={customers} columns={columns}
          sortingOrder={['asc', 'desc']}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange} />
      }
    </div>
  );
}

export default App;
