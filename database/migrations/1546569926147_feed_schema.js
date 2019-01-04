"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FeedSchema extends Schema {
  up() {
    this.create("feeds", table => {
      table.increments();
      table.string("title", 240).notNullable();
      table.string("description", 240).notNullable();
      table.string("url", 240).notNullable();
      table.string("author", 240).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("feeds");
  }
}

module.exports = FeedSchema;
