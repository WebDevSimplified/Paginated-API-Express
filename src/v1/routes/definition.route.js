const express = require("express");
const router = express.Router();

const { paginatedResults } = require("../middleware/pagination.middleware");
// const { authenticateApiKey } = require("../middleware/auth.middleware");

const Definition = require("./../../../mongo/models/definitions");

const {
  createDefinition,
  getDefinitionById,
  getDefinitionByTitle,
  updateDefinition,
  deleteDefinition,
} = require("./../../v1/controllers/definition.controller");

router
  .route("/")
  /**
   * @api {get} /definitions/ Get all definitions
   * @apiName GetDefinitions
   * @apiGroup Definitions
   * @apiPermission user
   *
   * @apiHeader {String} Authorization Developer's access token
   * @apiHeaderExample {json} Header-Example:
   * {
   *      "Authorization": Bearer Dfn.12345
   * }
   *
   * @apiQuery {Number} page=1 Page number.
   * @apiQuery {String} comparator=null Comparator for fetching definitions of a specified date range
   * @apiQuery {String} createdAt=null ISO 8601 DateTime String for fetching definitions of a specified range, definitions filtered according to `comparator` and `createdAt` queries
   * @apiQuery {String} updatedAt=null ISO 8601 DateTime String for fetching definitions of a specified range, definitions filtered according to `comparator` and `updatedAt` queries
   *
   * @apiSuccess {Object} info Information on paginated results (i.e., limit, next, previous, count, pages).
   * @apiSuccess {Number} info.limit=500 Page size
   * @apiSuccess {Number} info.next=null Identifier for subsequent page. Null if on the last page
   * @apiSuccess {Number} info.previous=null Identifier for previous page. Null if on the first page
   * @apiSuccess {Number} info.count=0 Total results found
   * @apiSuccess {Number} info.pages=0 Total number of pages
   *
   * @apiSuccess {Object[]} results List of definitions
   * @apiSuccess {String} results._id Unique Identifier
   * @apiSuccess {String} results.title Title of the definition (word or idiom)
   * @apiSuccess {String} results.definition Definition
   * @apiSuccess {String} results.category Category of the definition (word or idiom)
   * @apiSuccess {String} results.exampleUsage=null Example usage of a word or idiom
   * @apiSuccess {String} results.partOfSpeech=null Part of speech of a word definition (i.e., noun, verb, adjective, adverb). Null of its an idiom
   * @apiSuccess {String} results.rarity Rarity of the definition (i.e., common or rare)
   * @apiSuccess {String} results.spellingVariations=null Spelling variations of the definition. Null if its an idiom
   * @apiSuccess {String} results.createdAt DateTime ISO 8601 String for database definition creation time
   * @apiSuccess {String} results.updatedAt DateTime ISO 8601 String for database definition update time
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *      "info": {
   *           "limit": 1,
   *           "next": 2,
   *           "previous": null,
   *           "count": 7,
   *           "pages": 7
   *      },
   *      "results": [
   *           {
   *                "_id": "63ee2b80f2c91c3089905cfb",
   *                "title": "M-Chwa / M-Sape",
   *                "definition": "M-pesa - A mobile money solution available in Kenya",
   *                "category": "word",
   *                "exampleUsage": "Nitumie ile doh kwa Msape - Send me the money you owe through Mpesa",
   *                "partOfSpeech": "noun",
   *                "rarity": "common",
   *                "spellingVariations": null,
   *                "createdAt": "2023-02-16T13:11:28.568Z",
   *                "updatedAt": "2023-02-16T13:11:28.568Z",
   *                "__v": 0     *
   *           }
   *      ]
   * }
   *
   * @apiError Unauthorized-401 Invalid api key
   */
  .get(/*authenticateApiKey,*/ paginatedResults(Definition), (_, res, __) => {
    return res.json(res.paginatedResults);
  });

router
  .route("/")
  /**
   * @api {post} /definitions/ Create Definition
   * @apiName CreateDefinitions
   * @apiGroup Definitions
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Admin's access token
   * @apiHeaderExample {json} Header-Example:
   * {
   *      "Authorization": Bearer Adm.12345
   * }
   *
   * @apiBody {String} title Mandatory title
   * @apiBody {String} definition Mandatory definition
   * @apiBody {String} category Mandatory category (word or idiom),
   * @apiBody {String} partOfSpeech Mandatory part of speech (noun, verb etc),
   * @apiBody {String} exampleUsage Mandatory example usage,
   * @apiBody {String} rarity Mandatory rarity (common or rare),
   * @apiBody {String} [spellingVariations] Optional spelling variations
   *
   * @apiSuccess {String} title Mandatory title
   * @apiSuccess {String} definition Mandatory definition
   * @apiSuccess {String} category Mandatory category (word or idiom),
   * @apiSuccess {String} partOfSpeech Mandatory part of speech (noun, verb etc),
   * @apiSuccess {String} exampleUsage Mandatory example usage,
   * @apiSuccess {String} rarity Mandatory rarity (common or rare),
   * @apiSuccess {String} [spellingVariations] Optional spelling variations
   */
  .post(/*authenticateApiKey,*/ createDefinition);

router
  .route("/:title")
  /**
   * @api {get} /definitions/:title Get definition by title
   * @apiName GetDefinitionByTitle
   * @apiGroup Definitions
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Admin's access token
   * @apiHeaderExample {json} Header-Example:
   * {
   *      "Authorization": Bearer Adm.12345
   * }
   *
   * @apiParam {String} title Mandatory title
   *
   * @apiSuccess {String} title Mandatory title
   * @apiSuccess {String} definition Mandatory definition
   * @apiSuccess {String} category Mandatory category (word or idiom),
   * @apiSuccess {String} partOfSpeech Mandatory part of speech (noun, verb etc),
   * @apiSuccess {String} exampleUsage Mandatory example usage,
   * @apiSuccess {String} rarity Mandatory rarity (common or rare),
   * @apiSuccess {String} [spellingVariations] Optional spelling variations
   */
  .get(/*authenticateApiKey,*/ getDefinitionByTitle);

router
  .route("/:id")
  /**
   * @api {get} /definitions/:id Get definition by id
   * @apiName GetDefinitionById
   * @apiGroup Definitions
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Admin's access token
   * @apiHeaderExample {json} Header-Example:
   * {
   *      "Authorization": Bearer Adm.12345
   * }
   *
   * @apiParam {String} id Mandatory id
   *
   * @apiSuccess {String} title Mandatory title
   * @apiSuccess {String} definition Mandatory definition
   * @apiSuccess {String} category Mandatory category (word or idiom),
   * @apiSuccess {String} partOfSpeech Mandatory part of speech (noun, verb etc),
   * @apiSuccess {String} exampleUsage Mandatory example usage,
   * @apiSuccess {String} rarity Mandatory rarity (common or rare),
   * @apiSuccess {String} [spellingVariations] Optional spelling variations
   */
  .get(/*authenticateApiKey,*/ getDefinitionById);

router
  .route("/")
  /**
   * @api {put} /definitions/ Update definition
   * @apiName UpdateDefinition
   * @apiGroup Definitions
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Admin's access token
   * @apiHeaderExample {json} Header-Example:
   * {
   *      "Authorization": Bearer Adm.12345
   * }
   *
   * @apiBody {String} title Mandatory title
   * @apiBody {String} definition Mandatory definition
   * @apiBody {String} category Mandatory category (word or idiom),
   * @apiBody {String} partOfSpeech Mandatory part of speech (noun, verb etc),
   * @apiBody {String} exampleUsage Mandatory example usage,
   * @apiBody {String} rarity Mandatory rarity (common or rare),
   * @apiBody {String} [spellingVariations] Optional spelling variations
   *
   */
  .put(/*authenticateApiKey,*/ updateDefinition);

router
  .route("/:id")
  /**
   * @api {delete} /definitions/:id Delete definition
   * @apiName DeleteDefinition
   * @apiGroup Definitions
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Admin's access token
   * @apiHeaderExample {json} Header-Example:
   * {
   *      "Authorization": Bearer Adm.12345
   * }
   *
   * @apiParam {String} id Mandatory definition id
   */
  .delete(/*authenticateApiKey,*/ deleteDefinition);

module.exports = router;
