import React, { Component } from "react";
import { Collapse, Table, Tag } from "antd";
import api from "../../services/api";
const { Panel } = Collapse;

const rowColor = (record) => {
  return record.type === "Comissão paga" ? "red" : "green";
};

const columns = [
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Data",
    dataIndex: "transaction_date",
    key: "transaction_date",
  },
  {
    title: "Descrição do Produto",
    dataIndex: "product_description",
    key: "product_description",
  },
  {
    title: "Valor",
    dataIndex: "value",
    key: "value",
    render(text, record) {
      return {
        props: {
          style: { color: rowColor(record) },
        },
        children: <div>{text}</div>,
      };
    },
  },
];

const headerRender = (seller) => {
  return (
    <div>
      <p style={{ float: "left" }}>
        <b>{seller.type}: </b>
        {seller.name}
      </p>
      <p style={{ float: "right" }}>
        <b>Total: {seller.total}</b>
      </p>
    </div>
  );
};

class TransactionList extends Component {
  state = { sellers: [] };

  componentDidMount() {
    api.get("/transactions/list").then((response) => {
      this.setState({ sellers: response.data.sellers });
    });
  }

  render() {
    return (
      <div>
        <Collapse>
          {this.state.sellers.map((seller, i) => (
            <Panel header={headerRender(seller)} key={i}>
              <Table dataSource={seller.transactions} columns={columns} rowKey="id"></Table>
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

export default TransactionList;
