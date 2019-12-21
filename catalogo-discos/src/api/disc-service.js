import http from './config';

export default {
  // POST
  createDisc(disc) {
    return http.post('/discs', disc);
  },
  // GET all
  listAllDiscs() {
    return http.get('/discs');
  },
  // GET one disc
  findDisc(id) {
    return http.get(`/discs/${id}`);
  },
  // PUT (edit disc)
  editDisc(id, disc) {
    return http.put(`/discs/${id}`, disc);
  },
  // DELETE
  deleteDisc(id) {
    return http.delete(`/discs/${id}`);
  },
};
