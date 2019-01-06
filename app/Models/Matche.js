'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Matche extends Model {
    team01 () {
        return this.hasMany('App/Models/Team')
    }
    team02 () {
        return this.hasMany('App/Models/Team')
    }
    game () {
        return this.hasMany('App/Models/Game')
    }
    tournament () {
        return this.hasMany('App/Models/Tournament')
    }
}

module.exports = Matche
