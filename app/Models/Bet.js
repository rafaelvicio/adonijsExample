'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bet extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  tournament() {
    return this.belongsTo('App/Models/Tournament')
  }
  game() {
    return this.belongsTo('App/Models/Game')
  }
  team() {
    return this.belongsTo('App/Models/Team', "team_winner_id")
  }
}

module.exports = Bet
