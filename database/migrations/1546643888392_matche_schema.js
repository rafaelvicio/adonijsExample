"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MatcheSchema extends Schema {
  up() {
    this.create("matches", table => {
      table.increments();
      table
        .integer("winner_id")
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("team_01_id")
        .unsigned()
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("team_02_id")
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
      table.datetime("start_time");
      table.timestamps();
    });
  }

  down() {
    this.drop("matches");
  }
}

module.exports = MatcheSchema;
