'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Matche extends Model {
  tournament() {
    return this.belongsTo('App/Models/Tournament')
  }
  game() {
    return this.belongsTo('App/Models/Game')
  }
  team01() {
    return this.belongsTo('App/Models/Team', "team_01_id")
  }
  team02() {
    return this.belongsTo('App/Models/Team', "team_02_id")
  }
}

module.exports = Matche
