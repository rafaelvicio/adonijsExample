'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  matches() {
    return this.hasMany("App/Models/Matche");
  }
}

module.exports = Team
