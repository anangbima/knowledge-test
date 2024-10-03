import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import TransactionForm from '../../components/forms/TransactionForm';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axiosUser from '../../api/axios-user';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Transaction = () => {
  const [isValidate, setIsValidate] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);

  const [addDialog, setAddDialog] = useState(false); // Manage modal tambah
	const [editDialog, setEditDialog] = useState(false); //Manage modal edit
	const [deleteDialog, setDeleteDialog] = useState(false); // Manage modal hapus

  useEffect(() => {
    document.title = 'Transaction - GoFinance';
    getTransaction();
  }, [])

  // handle add dialog
  const handleAddDialog = () => {
    setAddDialog(!addDialog)
  }

  const handleEditDialog = (id) => {
    if (editDialog === true) {
      setEditDialog(false)
    }else{
      getDetailTransaction(id, 'forUpdate')
    }
  }

  const handleDeleteDialog = (id) => {
    if (deleteDialog === true) {
      setDeleteDialog(false)
    }else{
      getDetailTransaction(id, 'forDelete')
    }
  }

  const getTransaction = () => {
    axiosUser.get('transaction')
      .then(({data}) => {
        setTransaction(data)
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  const getDetailTransaction = (id, _for) => {
    axiosUser.get('transaction/'+id)
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
      flex: 1
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

            const payload = {
              item: formJson.item,
              price: formJson.price,
              date: formJson.date,
              status: formJson.status,
            }

            // proses menambadata
            axiosUser.post('transaction', payload)
              .then(({data}) => {
                handleAddDialog()
                getTransaction()
                showSwal('Success Add Transaction')
              })
          }
        }}
      >
        <DialogContent>
          <h3 className='link'>Add Transaction</h3>

          <Box sx={{ mt: 3 }}/>

          <TransactionForm
            isValidate={isValidate}
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

            const payload = {
              item: formJson.item,
              price: formJson.price,
              date: formJson.date,
              status: formJson.status,
            }

            // proses mengubah data
            axiosUser.put('transaction/'+detailTransaction.id, payload)
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

          <TransactionForm
            isValidate={isValidate}
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
            axiosUser.delete('transaction/'+detailTransaction.id)
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