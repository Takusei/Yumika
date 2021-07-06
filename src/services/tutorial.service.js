import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/inventories");
  }

  getAllReservation() {
    return http.get("/reservations");
  }

  get(id) {
    return http.get(`/inventories/${id}`);
  }

  create(data) {
    return http.post("/inventories", data);
  }

  update(id, data) {
    return http.put(`/inventories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inventories/${id}`);
  }

  deleteAll() {
    return http.delete(`/inventories`);
  }

  findByName(title) {
    return http.get(`/inventories?title=${title}`);
  }

  findByDate(searchFrom, searchTo) {
    return http.get(`/inventories/availabilitySearch?from=${searchFrom}&to=${searchTo}`);
  }

}

export default new TutorialDataService();