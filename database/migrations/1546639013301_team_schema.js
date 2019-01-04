"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TeamSchema extends Schema {
  up() {
    this.create("teams", table => {
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
    this.drop("teams");
  }
}

module.exports = TeamSchema;
