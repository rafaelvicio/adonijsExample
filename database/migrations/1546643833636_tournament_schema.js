"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TournamentSchema extends Schema {
  up() {
    this.create("tournaments", table => {
      table.increments();
      table.string("name", 240).notNullable();
      table.string("slug", 240).notNullable();
      table
        .integer("game_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("games")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("tournaments");
  }
}

module.exports = TournamentSchema;
