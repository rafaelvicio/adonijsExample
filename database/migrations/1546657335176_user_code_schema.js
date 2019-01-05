"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserCodeSchema extends Schema {
  up() {
    this.create("user_codes", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("code_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("codes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_codes");
  }
}

module.exports = UserCodeSchema;
