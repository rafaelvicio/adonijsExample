"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.get("/auth", "AuthController.auth");
Route.post("/auth/register", "AuthController.register");
Route.post("/auth/authenticate", "AuthController.authenticate");

Route.group(() => {
  Route.resource("games", "GameController").apiOnly();
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("teams", "TeamController").apiOnly();
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("tournaments", "TournamentController").apiOnly();
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("matches", "MatcheController").apiOnly();
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("bets", "BetController").apiOnly();
  Route.get("/bets/:id/resgatar", "BetController.resgatar");
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("historys", "HistoryController").apiOnly();
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("codes", "CodeController").apiOnly();
  Route.get("/codes/:id/resgatar", "CodeController.resgatar");
}).middleware(["auth"]);

Route.group(() => {
  Route.resource("feeds", "FeedController").apiOnly();
}).middleware(["auth"]);
