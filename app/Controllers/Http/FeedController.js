"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Feed = use("App/Models/Feed");

/**
 * Resourceful controller for interacting with feeds
 */
class FeedController {
  /**
   * Show a list of all feeds.
   * GET feeds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const feeds = await feeds.all();

    return feeds;
  }

  /**
   * Create/save a new feed.
   * POST feeds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.only(['content'])
    const feed = await Feed.create(data)

    return feed
  }

  /**
   * Display a single feed.
   * GET feeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const feed = await Feed.findOrFail(params.id)

    return feed
  }

  /**
   * Update feed details.
   * PUT or PATCH feeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['content'])
    const feed = await Feed.find(params.id)

    feed.merge(data)

    await feed.save()

    return feed
  }

  /**
   * Delete a feed with id.
   * DELETE feeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const feed = await Feed.findOrFail(params.id)
    await feed.delete()
  }
}

module.exports = FeedController;
