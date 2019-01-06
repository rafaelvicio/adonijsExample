'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusMatcheSchema extends Schema {
  up () {
    this.table('matches', (table) => {
      table.enu('status', ['aberta', 'fechada'])
    })
  }

  down () {
    this.table('matches', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = StatusMatcheSchema
