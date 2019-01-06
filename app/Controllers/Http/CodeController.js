"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const moment = require('moment');

const Code = use("App/Models/Code");

/**
 * Resourceful controller for interacting with codes
 */
class CodeController {

  async resgatar({
    params,
    request,
    response,
    auth
  }) {

    const code = await Code.findOrFail(params.id);

    var codeValidation = moment(code.date_validation);

    if (!codeValidation.isAfter(moment())) {
      console.log("Ja passou")
      return
    } else {
      console.log("Ainda nao passou")
    }

    //Verificar se cupom ja chegou ao limite

    //Verificar se ususario ja resgatou

    // Criando Historico
    try {
      const user = await auth.getUser()

      const historyData = {
        name: "Cupom resgatado",
        description: `Cupom ${code.code}`,
        type: "Cupom",
        points: code.points,
        user_id: user.id,
        date_validity: moment().add(3, 'years')
      }
  
      await History.create(historyData);

    } catch (error) {
      response.send('Missing or invalid jwt token')
    }

    // await user.codes().attach(params.id)

    // return user;
  }

  /**
   * Show a list of all codes.
   * GET codes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {
    const codes = await Code.all();

    return codes;
  }

  /**
   * Create/save a new code.
   * POST codes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {
    const data = request.only([
      "code",
      "points",
      "max_amount",
      "date_validation"
    ]);
    const code = await Code.create(data);

    return code;
  }

  /**
   * Display a single code.
   * GET codes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {
    const code = await Code.findOrFail(params.id);

    return code;
  }

  /**
   * Update code details.
   * PUT or PATCH codes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {
    const data = request.only(["title", "description", "url", "author"]);
    const code = await Code.find(params.id);

    code.merge(data);

    await code.save();

    return code;
  }

  /**
   * Delete a code with id.
   * DELETE codes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {
    const code = await Code.findOrFail(params.id);
    await code.delete();
  }
}

module.exports = CodeController;
