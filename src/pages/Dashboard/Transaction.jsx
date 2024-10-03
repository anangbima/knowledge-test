import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import TransactionForm from '../../components/forms/TransactionForm';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axiosClient from '../../api/axios-client';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);

  const [addDialog, setAddDialog] = useState(false); // Manage modal tambah
	const [editDialog, setEditDialog] = useState(false); //Manage modal edit
	const [deleteDialog, setDeleteDialog] = useState(false); // Manage modal hapus

  const [itemError, setItemError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [dateError, setDateError] = useState('');
  const [statusError, setStatusError] = useState('');
  

  useEffect(() => {
    document.title = 'Transaction - GoFinance';
    getTransaction();
  }, [])

  // handle add dialog
  const handleAddDialog = () => {
    setAddDialog(!addDialog)
    emptyInput();
  }

  // handle Edit dialog
  const handleEditDialog = (id) => {
    if (editDialog === true) {
      setEditDialog(false)
      emptyInput();
    }else{
      getDetailTransaction(id, 'forUpdate')
    }
  }

  // handle Delete dialog
  const handleDeleteDialog = (id) => {
    if (deleteDialog === true) {
      setDeleteDialog(false)
      emptyInput();
    }else{
      getDetailTransaction(id, 'forDelete')
    }
  }

  // get data transaction dari fake API
  const getTransaction = () => {
    axiosClient.get('transaction')
      .then(({data}) => {
        setTransaction(data)
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  // get data transaction by id dari fake API
  const getDetailTransaction = (id, _for) => {
    axiosClient.get('transaction/'+id)
      .then(({data}) => {
        setDetailTransaction(data)

        if (_for === 'forUpdate') {
          setEditDialog(true)
        }else{
          setDeleteDialog(true)
        }
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  // Kolom untuk header tabel
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "item",
      headerName: "Item",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price",
      width: 220,
      renderCell: (params) => (
        <div>
          $ {params.row.price}
        </div>
      )
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.status == 'Cancel' &&
            <span className='btn-status danger'>
              {params.row.status}
            </span>
          }

          {params.row.status == 'Waiting' &&
            <span className='btn-status warning'>
              {params.row.status}
            </span>
          }

          {params.row.status == 'Done' &&
            <span className='btn-status success'>
              {params.row.status}
            </span>
          }
        </>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      type: 'number',
      headerAlign: 'right',
      renderCell: ( params ) => (
        // console.log(params.row.slug)
        <div>
          <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => handleEditDialog(params.row.id)}
          >
            <MdOutlineEdit />
          </IconButton>

          <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDeleteDialog(params.row.id)}
          >
            <MdOutlineDelete />
          </IconButton>
        </div>
      ),
    }
  ]

  // Alert
  const showSwal = (_title) => {
    withReactContent(Swal).fire({
      icon: "success",
      title: _title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  const emptyInput = () => {
    setItemError('')
    setPriceError('')
    setDateError('')
    setStatusError('')
  }

  return (
    <div>
      <Header page='Transaction'/>

      <button className='btn' onClick={handleAddDialog}>
        Add
      </button>

      {/* Dialog Add Transaction */}
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={addDialog}
        onClose={handleAddDialog}
        PaperProps={{ 
          sx: { borderRadius: "15px" },
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            // Get Value
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries())

            // validate item
            if(formJson.item === '' || formJson.item === null) {
              setItemError('Item is required')
              return;
            }

            // validasi price
            if(formJson.price === '' || formJson.price === null) {
              setPriceError('Price is required')
              return;
            }

            // validasi date
            if(formJson.date === '' || formJson.date === null) {
              setDateError('Date is required')
              return;
            }

            // validasi status
            if(formJson.status === '' || formJson.status === null) {
              setStatusError('Status is required')
              return;
            }

            const payload = {
              item: formJson.item,
              price: formJson.price,
              date: formJson.date,
              status: formJson.status,
            }

            // proses menambadata
            axiosClient.post('transaction', payload)
              .then(({data}) => {
                handleAddDialog()
                getTransaction()
                emptyInput();
                showSwal('Success Add Transaction')
              })
          }
        }}
      >
        <DialogContent>
          <h3 className='link'>Add Transaction</h3>

          <Box sx={{ mt: 3 }}/>

          {/* Form Tambah */}
          <TransactionForm
            // isValidate={isValidate}
            itemError={itemError}
            priceError={priceError}
            dateError={dateError}
            statusError={statusError}
          />

        </DialogContent>
          
        <DialogActions>
          <Button onClick={handleAddDialog}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit Transaction */}
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={editDialog}
        onClose={handleEditDialog}
        PaperProps={{ 
          sx: { borderRadius: "15px" },
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            // Get Value
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries())

             // validate data
            if(formJson.item === '' || formJson.item === null) {
              setItemError('Item is required')
              return;
            }

            if(formJson.price === '' || formJson.price === null) {
              setPriceError('Price is required')
              return;
            }

            if(formJson.date === '' || formJson.date === null) {
              setDateError('Date is required')
              return;
            }

            if(formJson.status === '' || formJson.status === null) {
              setStatusError('Status is required')
              return;
            }

            const payload = {
              item: formJson.item,
              price: formJson.price,
              date: formJson.date,
              status: formJson.status,
            }

            // proses mengubah data
            axiosClient.put('transaction/'+detailTransaction.id, payload)
              .then(({data}) => {
                handleEditDialog()
                getTransaction()
                showSwal('Success Update Transaction')
              })
          } 
        }}
      >
        <DialogContent>
          <h3 className='link'>Edit Transaction</h3>

          <Box sx={{ mt: 3 }}/>

          {/* Form Edit */}
          <TransactionForm
            itemError={itemError}
            priceError={priceError}
            dateError={dateError}
            statusError={statusError}
            value={detailTransaction}
          />

        </DialogContent>
          
        <DialogActions>
          <Button onClick={handleEditDialog}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Delete Transaction */}
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={deleteDialog}
        onClose={handleDeleteDialog}
        PaperProps={{ 
          sx: { borderRadius: "15px" },
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            // proses menghapus data
            axiosClient.delete('transaction/'+detailTransaction.id)
              .then(({data}) => {
                handleDeleteDialog()
                getTransaction()
                showSwal('Success Delete Transaction')
              })
          } 
        }}
      >
        <DialogContent>
          <h3 className='link'>Delete Transaction</h3>

          <Box sx={{ mt: 3 }}/>

          <div>
            Are you sure want to delete data ?
          </div>

        </DialogContent>
          
        <DialogActions>
          <Button onClick={handleDeleteDialog}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </Dialog>

      <div className={'content'}>
        {/* Menampilkan data transaction dalam bentuk table */}
        <DataGrid
          rows={transaction}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  )
}

export default Transaction