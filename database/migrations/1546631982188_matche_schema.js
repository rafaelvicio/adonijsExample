'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatcheSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatcheSchema
