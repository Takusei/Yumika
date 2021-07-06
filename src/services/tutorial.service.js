import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/inventories");
  }

  get(id) {
    return http.get(`/inventories/${id}`);
  }

  create(data) {
    console.log(data);
    // const {name, type, description, availableFrom, availableTo, availableTo} = ...data;
    const name = data.name;
    const type = data.type;
    const description = data.description;
    const availableFrom = data.availableFrom;
    const availableTo = data.availableTo;
    return http.post(`/inventories?name=${name}&type=${type}&description=${description}&availableFrom=${availableFrom}&availableTo=${availableTo}`);
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