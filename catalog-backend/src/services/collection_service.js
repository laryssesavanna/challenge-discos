const express = require('express');
const { check } = require('express-validator');
const controlCollection = require('../controllers/collection_control');

const router = express.Router();

// URL: http://localhost:6001/collections
// GET all collections.
router.get("/", (req, res) => {
    controlCollection.listAllCollections((response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections/:idColl
// GET one collection with id = idColl.
router.get("/:idColl", (req, res) => {
    let id = parseInt(req.params.idColl);

    controlCollection.findCollectionById(id, (response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections
// POST collections.
// PS.: Sorry, I tried to make it clean, but express-validation lib doesn't help.
router.post("/", [
    // name validation
    check('name').isLength({ min: 1, max: 45 }).withMessage("The name must be between 1 and 45 characters.")
    .isString().withMessage("The name must be a string."),
    // description validation
    check('description').isLength({ max: 45 }).withMessage("The description must be max 45 characters.")
    .isString().withMessage("The description must be a string")
    ], (req, res) => {

    let collection = {
        name: req.body.name,
        description: req.body.description
    }

    controlCollection.createCollection(req, collection, (response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections
// PUT collections.
// PS.: Sorry, I tried to make it clean, but express-validation lib doesn't help.
router.put("/:idColl", [
    // name validation
    check('name').isLength({ min: 1, max: 45 }).withMessage("The name must be between 1 and 45 characters.")
    .isString().withMessage("The name must be a string."),
    // description validation
    check('description').isLength({ max: 45 }).withMessage("The description must be max 45 characters.")
    .isString().withMessage("The description must be a string")
    ], (req, res) => {

    let collection = {
        idColl: parseInt(req.params.idColl),
        name: req.body.name,
        description: req.body.description
    }

    controlCollection.editCollection(req, collection, (response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections/:idColl
// DELETE collection.
router.delete("/:idColl", (req, res) => {
    let id = parseInt(req.params.idColl);

    controlCollection.removeCollection(id, (response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections/:idDisc&idColl=:idColl
// GET add disc in a collection. OK
router.get("/addDiscToColl/idDisc=:idDisc&idColl=:idColl", (req, res) => {
    let idDisc = parseInt(req.params.idDisc);
    let idColl = parseInt(req.params.idColl);

    controlCollection.addDiscInCollection(idDisc, idColl, (response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections/:idColl
// DELETE disc from collection.
router.delete("/removeDiscColl/idDisc=:idDisc&idColl=:idColl", (req, res) => {
    let idDisc = parseInt(req.params.idDisc);
    let idColl = parseInt(req.params.idColl);

    controlCollection.removeDiscFromCollection(idDisc, idColl, (response, code) => {
        res.status(code).json(response);
    });
});

// URL: http://localhost:6001/collections/collecDisc/:idCollec
// GET all discs from collection OK
router.get("/collecDisc/:idCollec", (req, res) => {
    let idCollec = parseInt(req.params.idCollec);

    controlCollection.listAllDiscsFromColl(idCollec, (response, code) => {
        res.status(code).json(response);
    });
});
module.exports = router;