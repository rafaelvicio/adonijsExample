"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CodesSchema extends Schema {
  up() {
    this.create("codes", table => {
      table.increments();
      table.string("code", 240).notNullable();
      table.string("points", 240).notNullable();
      table.string("max_amount", 240).notNullable();
      table.datetime("date_validation");
      table.timestamps();
    });
  }

  down() {
    this.drop("codes");
  }
}

module.exports = CodesSchema;
