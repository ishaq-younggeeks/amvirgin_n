import Modal from "react-modal";
import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";

const TransactionsModal = ({
  isOpen,
  onRequestClose,
  style,
  paymentsDetails,
  transactionId
}) => {
  const [transactions, setTransactions] = useState(paymentsDetails);

  useEffect(() => {
    setTransactions(paymentsDetails);
  });
  console.log("Transactions :", transactions);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={style}
        ariaHideApp={false}
      >
        <div>
          <h1>Details of {transactionId}:</h1>
          <hr />
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>DATE</th>
                <th>ORDER ID</th>
                <th>DESCRIPTION</th>
                <th>QUANTITY</th>
                <th>PRODUCT SALES</th>
                <th>SELLING FEES</th>
                <th>COURIER CHARGES</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                ? transactions.map((item) => (
                    <tr key={item.key}>
                      <td>{item.date}</td>
                      <td>{item.key}</td>
                      <td>{item.description ? item.description : "N/A"}</td>
                      <td>{item.quantity}</td>
                      <td>{item.sales}</td>
                      <td>{item.sellingFee}</td>
                      <td>{item.courierCharges}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionsModal;
