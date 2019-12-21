const mangDB = require('../manage_database/collection_manage');
const { validationResult } = require('express-validator');

// 
// This function returns a list of all collections stored in database.
//
exports.listAllCollections = (res) => {
    mangDB.selectAllCollections((err, data) => {
        let response = null;
        let errors   = [];

        // If there is no internal error.
        if (!err) {
            // If there is no collections in database
            if (data.length == 0 || data == null) {
                response = {
                    status: 'Success',
                    data: data,
                    message: 'No collections found in database.'
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
                message: 'Something went wrong trying to list all collections.'
            }
            return res(response, 500);
        }
    });
}

// 
// This function returns a collection with id = :idColl.
//
exports.findCollectionById = (idColl, res) => {
    let response = null;
    let errors   = [];

    // Check if id is integer
    if (!Number.isInteger(idColl)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    // If it's ok, continue.
    mangDB.findCollection(idColl, (err, data) => {
        // If there is no internal error.
        if (!err) {
            // If the collection was not found in database
            if (data.length == 0 || data == null) {
                errors.push('Object Not Found');
                response = {
                    status: 'Not Found',
                    errors: errors,
                    message: 'The collection does not exist in database. Id = ' + idColl
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
                message: 'Something went wrong trying to find collection. Id = ' + idColl
            }
            return res(response, 500);
        }
    });
}

// 
// This function inserts a new collection in database.
//
exports.createCollection = (req, collection, res) => {
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
    mangDB.saveCollection(collection, (err, data) => {
        
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
                message: 'Something went wrong trying to save collection in database.'
            }
            return res(response, 500);
        }
    });
}

// 
// This function edits a collection.
//
exports.editCollection = (req, collection, res) => {
    let response   = null;
    let errors     = [];
    let invalid    = validationResult(req);

    // Check if id is integer
    if (!Number.isInteger(collection.idColl)) {
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

    // Check if collection exists in database
    this.findCollectionById(collection.idColl, (resp, code) => {
        // If collection exists, continue.
        if(code == 200){
            mangDB.updateCollection(collection, (err, data)=> {
                if (!err) {
                    // If there is no internal error.
                    response = {
                        status: 'Success',
                        data: collection,
                        message: 'Query executed successfully.'
                    }
                    return res(response, 200);
                } else {
                    // Something went wrong, lets save the errors and return.
                    errors.push(err.message)
                    response = {
                        status: 'Internal Error',
                        errors: errors,
                        message: 'Something went wrong trying to update collection in database.'
                    }
                    return res(response, 500);
                }
            });
        }
        else{
            // The collection doesn't exists in database
            return res(resp, code);
        }
    });
}

// 
// This function removes a collection from database.
//
exports.removeCollection = (idColl, res) => {
    let response = null;
    let errors   = [];

    // Check if id is integer
    if (!Number.isInteger(idColl)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    // Check if disc exists in database
    this.findCollectionById(idColl, (resp, code) => {
        // If collection exists, continue.
        if(code == 200){
            mangDB.deleteCollection(idColl, (err, data) => {
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
                        message: 'Something went wrong trying remove collection. Id = ' + idColl
                    }
                    return res(response, 500);
                }
            });
        }else{
            // The collection doesn't exists in database
            return res(resp, code);
        }
    });
}

// 
// This function insert new disc in a collection.
//
exports.addDiscInCollection = (idDisc, idColl, res) => {
    let response   = null;
    let errors     = [];

    // Check if ids are integer
    if (!Number.isInteger(idDisc) || !Number.isInteger(idColl)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    mangDB.insertDiscInCollection(idDisc, idColl, (err, data) => {
        if (!err) {
            // If there is no internal error.
            response = {
                status: 'Success',
                data: 'No Content',
                message: 'Query executed successfully.'
            }
            return res(response, 204);
        } else {
            // Something went wrong, lets save the errors and return.
            errors.push(err.message);
            response = {
                status: 'Internal Error',
                errors: errors,
                message: 'Something went wrong trying to add the disc in collection.'
            }
            return res(response, 500);
        }
    });
}

// 
// This function removes a disc from collection.
//
exports.removeDiscFromCollection = (idDisc, idColl, res) => {
    let response = null;
    let errors   = [];

    // Check if ids are integer
    if (!Number.isInteger(idDisc) || !Number.isInteger(idColl)) {
        errors.push('Invalid argument');
        response = {
            status: 'Bad Request',
            errors: errors,
            message: 'Id must be an integer.'
        }
        return res(response, 400);
    }

    // Check if collection exists in database
    this.findCollectionById(idColl, (resp, code) => {
        // If collection exists, continue.
        if(code == 200){
            mangDB.deleteDiscFromColl(idDisc, idColl, (err, data) => {
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
                        message: 'Something went wrong trying remove collection. Id = ' + idColl
                    }
                    return res(response, 500);
                }
            });
        }else{
            // The collection doesn't exists in database
            return res(resp, code);
        }
    });
}

// 
// This function returns a list of all discs from a collection
//
exports.listAllDiscsFromColl = (idColl, res) => {
    mangDB.selectAllDiscsFromColl(idColl, (err, data) => {
        let response = null;
        let errors   = [];

        // If there is no internal error.
        if (!err) {
            // If there is no collections in database
            if (data.length == 0 || data == null) {
                response = {
                    status: 'Success',
                    data: data,
                    message: 'No discs found in collection.'
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
                message: 'Something went wrong trying to list all discs from collections.'
            }
            return res(response, 500);
        }
    });
}