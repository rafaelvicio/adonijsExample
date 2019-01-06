'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusBetSchema extends Schema {
  up () {
    this.table('bets', (table) => {
      table.enu('status', ['aberta', 'fechada'])
    })
  }

  down () {
    this.table('bets', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = StatusBetSchema
