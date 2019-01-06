'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', (table) => {
      table.increments()
      table.string("name", 240).notNullable();
      table.string("description", 240).notNullable();
      table.string("type", 240).notNullable();
      table.string("points", 240).notNullable();
      table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      table.datetime("date_validity");
      table.timestamps()
    })
  }

  down () {
    this.drop('histories')
  }
}

module.exports = HistorySchema
