'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetSchema extends Schema {
  up () {
    this.create('bets', (table) => {
      table.increments()
      table
        .integer("matche_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("matches")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .integer("team_winner_id")
        .unsigned()
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .integer("tournament_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tournaments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .integer("game_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("games")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps()
    })
  }

  down () {
    this.drop('bets')
  }
}

module.exports = BetSchema
