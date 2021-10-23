export default {
  /**
   * @param json
   * @returns {Promise<{"status":"success","id":number}>}
   */
  save (json) {
    return fetch("api/flipper/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    }).then((res) => res.json());
  },
  randomRecord (star) {
    return fetch(`api/flipper/star${star}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json());
  },
  bloodPressureRecord () {
    return fetch("api/flipper/bloodPressureTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json());
  },
  bloodPressureCount () {
    return fetch("api/flipper/bloodPressureCount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json());
  },
  getRecord (recordId) {
    return fetch(`api/flipper/record/${recordId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json());
  }
};
