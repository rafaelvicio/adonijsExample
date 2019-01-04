"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tournament = use("App/Models/Tournament");

/**
 * Resourceful controller for interacting with tournaments
 */
class TournamentController {
  /**
   * Show a list of all tournaments.
   * GET tournaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const tournaments = await Tournament.all();

    return tournaments;
  }

  /**
   * Create/save a new tournament.
   * POST tournaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name", "slug", "game_id"]);
    const tournament = await Tournament.create(data);

    return tournament;
  }

  /**
   * Display a single tournament.
   * GET tournaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const tournament = await Tournament.findOrFail(params.id);

    return tournament;
  }

  /**
   * Update tournament details.
   * PUT or PATCH tournaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["name", "slug", "game_id"]);
    const tournament = await Tournament.find(params.id);

    tournament.merge(data);

    await tournament.save();

    return tournament;
  }

  /**
   * Delete a tournament with id.
   * DELETE tournaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const tournament = await Tournament.findOrFail(params.id);
    await tournament.delete();
  }
}

module.exports = TournamentController;
