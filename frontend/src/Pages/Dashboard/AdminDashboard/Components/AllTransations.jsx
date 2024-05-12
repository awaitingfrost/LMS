import React, { useEffect, useState } from 'react'
import Modals from '../../../../common/Modal';
import { Button } from 'semantic-ui-react';
import AddTransaction from './AddTransaction';
import axios from 'axios';
import SelectLabels from '../../../../common/Select';

const AllTransations = ({ setToastMessage, setToast }) => {

  const API_URL = process.env.REACT_APP_API_URL
  const [open, setOpen] = useState(false);

  const [allUserList, setAllUsers] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}api/users/allusers`);
        setAllUsers([...response.data, { _id: 'none', userFullName: 'None' }])
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    fetchAllUsers()
  }, [API_URL])

  const [recentTransactions, setRecentTransactions] = useState([])

  const [userId, setUserId] = React.useState('');

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(API_URL + "api/transactions/all-transactions")
        setRecentTransactions(response.data.slice(0, 10))
      }
      catch (err) {
        console.log("Error in fetching transactions")
      }
    }
    getTransactions()
  }, [API_URL])


  const removeTransaction = async (transactionId) => {
    try {
      await axios.delete(API_URL + "api/transactions/remove-transaction/" + transactionId)
      setToastMessage('Transactions Removed Successfully 🎉')
      setToast(true)
      setOpen(false)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    catch (err) {
      setToastMessage('Error Removing Transaction')
      setToast(true)
      setOpen(false)
    }
  }


  useEffect(() => {
    const fetchTransactionsByUserId = async () => {
      if (userId) {
        try {
          const response = await axios.get(API_URL + "api/transactions/userid/all-transactions", {
            params: {
              userId
            }
          })
          setRecentTransactions(response.data.slice(0, 10))
        } catch (err) {
          console.error("Failed to fetch books:", err);
        }
      }
    }
    fetchTransactionsByUserId()
  }, [userId, API_URL])

  return (
    <div>
      <Modals title={'Add Transactions'} open={open} setOpen={setOpen} close={() => setOpen(false)}>
        <AddTransaction setOpen={setOpen} setToastMessage={setToastMessage} setToast={setToast} />
      </Modals>
      <div className='page-header'>
        <p className="dashboard-option-title">Transactions List</p>
        <div className='filter-form'>
          <Button className="mt-4" onClick={() => setOpen(true)} >
            + Add Transaction
          </Button>
          <Button className="mt-4">
            <SelectLabels userList={allUserList} userId={userId} setUserId={setUserId} />
          </Button>
        </div>
      </div>
      <div className="dashboard-title-line"></div>
      <div className='transaction-body'>
        <div className='transaction-list'>

        </div>
        <div className='transactions-table'>
          <table className="admindashboard-table mt-4">
            <tr>
              <th>S.No</th>
              <th>Book Name</th>
              <th>Borrower Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
            {
              recentTransactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.bookName}</td>
                    <td>{transaction.borrowerName}</td>
                    <td>{transaction.updatedAt.slice(0, 10)}</td>
                    <td><button onClick={() => removeTransaction(transaction._id)} style={{ color: "red" }}>Delete</button></td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllTransations