import React, { useState } from 'react'
import Header from '../../components/Header'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaPlus } from "react-icons/fa";

const Transaction = () => {
  const [transaction, setTransaction] = useState([])
  const [addDialog, setAddDialog] = useState(false); // Manage modal tambah
	const [editDialog, setEditDialog] = useState(false); //Manage modal edit
	const [deleteDialog, setDeleteDialog] = useState(false); // Manage modal hapus

  // handle add dialog
  const handleAddDialog = () => {
    setAddDialog(!addDialog)
  }

  return (
    <div>
      <Header page='Transaction'/>

      <button className='btn' onClick={handleAddDialog}>
        Add
      </button>

      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={addDialog}
        onClose={handleAddDialog}
      >
        <DialogContent>
          <div>Add Transaction</div>


        </DialogContent>

        <DialogActions>
          
        </DialogActions>
      </Dialog>

      <div className='content'>
        
      </div>
    </div>
  )
}

export default Transaction