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
    const { name, type, description, dtAvailableFrom, dtAvailableTo } = data;
    return http.patch(
      `inventories?id=${id}&name=${name}&type=${type}&description=${description}&availableFrom=${dtAvailableFrom}&availableTo=${dtAvailableTo}`
    );
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