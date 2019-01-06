"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const moment = require('moment');

const User = use("App/Models/User");
const Code = use("App/Models/Code");
const UserCode = use("App/Models/UserCode");
const History = use("App/Models/History");
const Database = use('Database')

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

    let user;

    try {
      const authUser = await auth.getUser()
      user = await User.findOrFail(authUser.id);
    } catch (error) {
      response.send('Missing or invalid jwt token')
      return
    }

    const code = await Database.from("codes").where({
      code: params.id
    }).first()

    if (code.length == 0) {
      response.send("Cupom nao encontrado")
      return
    }

    if (!moment(code.date_validation).isAfter(moment())) {
      response.send("Cupom ja vencido")
      return
    }

    //Verificar se ususario ja resgatou
    const userCode = await Database.from("user_codes").where({
      user_id: user.id,
      code_id: code.id
    })

    if (userCode.length != 0) {
      response.send("Voce ja resgatou esse cupom")
      return
    }

    //Verificar se cupom ja chegou ao limite de uso

    const history = {
      name: "Cupom resgatado",
      description: `Cupom ${code.code}`,
      type: "Cupom",
      points: code.points,
      user_id: user.id,
      date_validity: moment().add(3, 'years')
    }

    await History.create(history);
    await user.codes().attach(code.id)
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
