import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/inventories");
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

  findByTitle(title) {
    return http.get(`/inventories?title=${title}`);
  }
}

export default new TutorialDataService();