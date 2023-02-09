'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.enu('type', [1, 2, 3, 4]).notNullable()
      /* 
      Transaction Types
      1 - Venda produtor (+)
      2 - Venda afiliado (+)
      3 - Comissão paga (-)
      4 - Comissão recebida (+)
      */
      table.date('transaction_date').notNullable()
      table.string('product_description', 30).notNullable()
      table.integer('value').notNullable()
      table.string('seller', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsSchema
