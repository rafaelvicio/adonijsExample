"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Matche = use("App/Models/Matche");

/**
 * Resourceful controller for interacting with matches
 */
class MatcheController {
  /**
   * Show a list of all matches.
   * GET matches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const matches2 = await Matche.query()
      .with("game", "tournament")
      .fetch();

    return matches2;
  }

  /**
   * Create/save a new matche.
   * POST matches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "winner_id",
      "team_01_id",
      "team_02_id",
      "tournament_id",
      "game_id",
      "start_time"
    ]);
    const matche = await Matche.create(data);

    return matche;
  }

  /**
   * Display a single matche.
   * GET matches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const matche = await Matche.findOrFail(params.id);

    return matche;
  }

  /**
   * Update matche details.
   * PUT or PATCH matches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      "winner_id",
      "team_01_id",
      "team_02_id",
      "tournament_id",
      "game_id",
      "start_time"
    ]);
    const matche = await Matche.find(params.id);

    matche.merge(data);

    await matche.save();

    return matche;
  }

  /**
   * Delete a matche with id.
   * DELETE matches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const matche = await Matche.findOrFail(params.id);
    await matche.delete();
  }
}

module.exports = MatcheController;
