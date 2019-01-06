'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Bet = use("App/Models/Bet");
const Matche = use("App/Models/Matche");
const History = use("App/Models/History");

/**
 * Resourceful controller for interacting with bets
 */
class BetController {

  async resgatar ({ params, request, response, auth }) {
    const bet = await Bet.find(params.id);

    if (bet.status == "fechada") {
      response.send('Bet ja esta fechada')
      return
    }

    const matche = await Matche.find(bet.matche_id);

    if(matche.status !== "fechada") {
      response.send('Partida nao ja esta fechada')
      return
    }

    if(matche.winner_id == "" || matche.winner_id == null) {
      response.send('Partida sem vencedor anunciado')
      return
    }

    const user = await auth.getUser()

    //Criar History

    const historyData = {
      name: "Primeira History",
      description: "Descricao",
      type: "Aposta",
      points: "100",
      user_id: user.id,
      date_validity: "2020-01-05 15:17:22"
    }

    await History.create(historyData);

    bet.status = "fechada"

    await bet.save();

    return bet;
  }

  /**
   * Show a list of all bets.
   * GET bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const bets = await Bet.all();

    return bets;
  }

  /**
   * Create/save a new bet.
   * POST bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.only([
      "matche_id",
      "team_winner_id",
      "tournament_id",
      "game_id"
    ]);
    try {
      const user = await auth.getUser()
      const bet = await Bet.create({ user_id: user.id, ...data });
      return bet;
    } catch (error) {
      response.send('Missing or invalid jwt token', error)
    }
  }

  /**
   * Display a single bet.
   * GET bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const bet = await Bet.findOrFail(params.id);

    return bet;
  }

  /**
   * Update bet details.
   * PUT or PATCH bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([ "matche_id",
    "user_id",
    "team_winner_id",
    "tournament_id",
    "game_id"]);
    const bet = await Bet.find(params.id);

    bet.merge(data);

    await bet.save();

    return bet;
  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const bet = await Bet.findOrFail(params.id);
    await bet.delete();
  }
}

module.exports = BetController
