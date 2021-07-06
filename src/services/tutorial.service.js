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