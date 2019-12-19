const express = require('express');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const controlDisc = require('../controllers/disc_control');

const router = express.Router();

// GET all discs. URL: http://localhost:6001/discs
router.get("/", (req, res) => {
    controlDisc.listAllDiscs((response, code) => {
        res.status(code).json(response);
    });
});

// GET one disc with id = idDisc. URL: http://localhost:6001/discs/:idDisc
router.get("/:idDisc", (req, res) => {
    let id = parseInt(req.params.idDisc);

    controlDisc.findDiscById(id, (response, code) => {
        res.status(code).json(response);
    });
});

// POST disc. URL: http://localhost:6001/discs/:idDisc
// PS.: Sorry, I tried to make it clean, but express-validation lib doesn't help.
router.post("/", [
                // title validation
                check('title').isLength({ min: 1, max: 45 }).withMessage("The title must be between 1 and 45 characters.")
                .isString().withMessage("The title must be a string."),
                // artist_name validation
                check('artist_name').isLength({ min: 1, max: 45 }).withMessage("The artist's name must be between 1 and 45 characters.")
                .isString().withMessage("The artist's name must be a string"),
                // genre validation
                check('genre').isLength({ min: 1, max: 45 }).withMessage("The genre must be between 1 and 45 characters.")
                .isString().withMessage("The genre must be a string "),
                // year validation
                check('year').notEmpty().withMessage("The year must not be empty.")
                ], (req, res) => {
    
    let disc = {
        title: req.body.title,
        artist_name: req.body.artist_name,
        genre: req.body.genre,
        year: req.body.year
    }

    controlDisc.createDisc(req, disc, (response, code) => {
        res.status(code).json(response);
    });
});

// PUT

// DELETE
module.exports = router;