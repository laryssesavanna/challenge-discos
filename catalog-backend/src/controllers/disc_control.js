const mangDB = require('../manage_database/disc_manage');
const { validationResult } = require('express-validator');

// 
// This function returns a list of all discs stored in database.
//
exports.listAllDiscs = (res) => {
    mangDB.selectAllDiscs((err, data) => {
        let response = null;
        let errors   = [];

        // If there is no internal error.
        if (!err) {
            // If there is no discs in database
            if (data.length == 0 || data == null) {
                response = {
                    status: 'Success',
                    data: data,
                    message: 'No discs found in database.'
                }
            } else {
                response = {
                    status: 'Success',
                    data: data,
                    message: 'Query executed successfully.'
                }
            }
            return res(response, 200);
        } else {
            // Something went wrong, lets save the errors and return.
            errors.push(err.message);
            response = {
                status: 'Internal Error',
                errors: errors,
                message: 'Something went wrong trying to list all discs.'
            }
            return res(response, 500);
        }
    });
}

// 
// This function returns a disc with id = :idDisc.
//
exports.findDiscById = (idDisc, res) => {
    let response = null;
    let errors   = [];

    // Check if id is integer
    if (!Number.isInteger(idDisc)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    // If it's ok, continue.
    mangDB.findDisc(idDisc, (err, data) => {
        // If there is no internal error.
        if (!err) {
            // If the disc was not found in database
            if (data.length == 0 || data == null) {
                errors.push('Object Not Found');
                response = {
                    status: 'Not Found',
                    errors: errors,
                    message: 'The disc does not exist in database. Id = ' + idDisc
                }
                return res(response, 404);
            }
            else {
                response = {
                    status: 'Success',
                    data: data,
                    message: 'Query executed successfully.'
                }
                return res(response, 200);
            }
        }
        else {
            // Something went wrong, lets save the errors and return.
            errors.push(err.message);
            response = {
                status: 'Internal Error',
                errors: errors,
                message: 'Something went wrong trying to find disc. Id = ' + idDisc
            }
            return res(response, 500);
        }
    });
}

// 
// This function inserts a new disc in database.
//
exports.createDisc = (req, disc, res) => {
    let response   = null;
    let errors     = [];
    let invalid    = validationResult(req);

    // If there are invalid values, return error
    if(!invalid.isEmpty()){
        response = {
            status: 'Bad Request',
            errors: invalid.array(),
            message: 'Invalid value on JSON object.'
        }
        return res(response, 400);
    }

    // If it's ok, continue
    mangDB.insertDisc(disc, (err, data) => {
        if (!err) {
            // If there is no internal error.
            response = {
                status: 'Success',
                data: 'Id: ' + data.insertId,
                message: 'Query executed successfully.'
            }
            return res(response, 200);
        } else {
            // Something went wrong, lets save the errors and return.
            errors.push(err.message);
            response = {
                status: 'Internal Error',
                errors: errors,
                message: 'Something went wrong trying to save disc in database.'
            }
            return res(response, 500);
        }
    });
}

// 
// This function edits a disc.
//
exports.editDisc = (req, disc, res) => {
    let response   = null;
    let errors     = [];
    let invalid    = validationResult(req);

    // Check if id is integer
    if (!Number.isInteger(disc.idDisc)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    // If there are invalid values, return error
    if(!invalid.isEmpty()){
        response = {
            status: 'Bad Request',
            errors: invalid.array(),
            message: 'Invalid value on JSON object.'
        }
        return res(response, 400);
    }

    // Check if disc exists in database
    this.findDiscById(disc.idDisc, (resp, code) => {
        // If disc exists, continue.
        if(code == 200){
            mangDB.updateDisc(disc, (err, data)=> {
                if (!err) {
                    // If there is no internal error.
                    response = {
                        status: 'Success',
                        data: disc,
                        message: 'Query executed successfully.'
                    }
                    return res(response, 200);
                } else {
                    // Something went wrong, lets save the errors and return.
                    errors.push(err.message)
                    response = {
                        status: 'Internal Error',
                        errors: errors,
                        message: 'Something went wrong trying to update disc in database.'
                    }
                    return res(response, 500);
                }
            });
        }else{
            // The disc doesn't exists in database
            return res(resp, code);
        }
    });
}

// 
// This function removes a disc from database.
//
exports.removeDisc = (idDisc, res) => {
    let response = null;
    let errors   = [];

    // Check if id is integer
    if (!Number.isInteger(idDisc)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    // Check if disc exists in database
    this.findDiscById(idDisc, (resp, code) => {
        // If disc exists, continue.
        if(code == 200){
            mangDB.deleteDisc(idDisc, (err, data) => {
                // If there is no internal error.
                if (!err) {
                    response = {
                        status: 'Success',
                        data: 'No Content',
                        message: 'Query executed successfully.'
                    }
                    return res(response, 204);
                }
                else {
                    // Something went wrong, lets save the errors and return.
                    errors.push(err.message);
                    response = {
                        status: 'Internal Error',
                        errors: errors,
                        message: 'Something went wrong trying remove disc. Id = ' + idDisc
                    }
                    return res(response, 500);
                }
            });
        }else{
            // The disc doesn't exists in database
            return res(resp, code);
        }
    });
}