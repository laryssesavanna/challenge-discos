import http from './config';

export default {
  // POST collection
  createCollection(collection) {
    return http.post('/collections', collection);
  },
  // GET all collections
  listAllCollections() {
    return http.get('/collections');
  },
  // GET one collection
  findCollection(id) {
    return http.get(`/collections/${id}`);
  },
  // PUT (edit collection)
  editCollection(id) {
    return http.put(`/collections/${id}`);
  },
  // DELETE collection
  deleteCollection(id) {
    return http.delete(`/collections/${id}`);
  },
  // GET all discs from collection
  listAllDiscsFromColl(id) {
    return http.get(`/collections/collecDisc/${id}`);
  },
  // DELETE disc from collection
  deleteDiscFromCollection(idDisc, idColl) {
    return http.delete(`/collections/removeDiscColl/idDisc=${idDisc}&idColl=${idColl}`);
  },
  // Add disc in collection
  insertDiscInCollection(idDisc, idColl) {
    return http.get(`/collections/addDiscToColl/idDisc=${idDisc}&idColl=${idColl}`);
  },
};
