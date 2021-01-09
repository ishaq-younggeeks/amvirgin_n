import Modal from "react-modal";
import React from "react";
import { Table } from "react-bootstrap";

const TransactionsModal = ({
  isOpen,
  onRequestClose,
  style,
  transactionId,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={style}
        ariaHideApp={false}
      >
        <div>
          <h1>Transaction Details :</h1>
          <hr />
          <Table striped bordered hover size="sm">
              <thead>
              <tr key={2}>
              <th>Order ID</th>
              <th>Description</th>
              <th>Sales</th>
              <th>Quantity</th>
              <th>Fees</th>
              <th>GST</th>
              <th>Total</th>
              </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>2</td>
                      <td>Nikey</td>
                      <td>200$</td>
                      <td>4x</td>
                      <td>2$</td>
                      <td>1.5$</td>
                      <td>10$</td>
                  </tr>
              </tbody>
          </Table>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionsModal;
