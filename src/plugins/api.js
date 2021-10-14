let baseURL = process.env.VUE_APP_HOST_NAME || '';
let resourceURL = process.env.VUE_APP_RESOURCE_URL || '';

/** @typedef  {Object} character
 * @property {string} attri
 * @property {string} id
 * @property {string} name
 * @property {'5-pu','5','4','3'} rarity
 * */

const ResponseHandler = async (res) => {
  if (res.status !== 200) {
    let rs = await res.json();
    console.log(rs.error);
    throw new Error(rs.error);
  }
  return res.json();
};

export default {
  /**
   * @param json
   * @returns {Promise<{"status":"success","id":number}>}
   */
    save (json) {
    return fetch('api/flipper/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }).then(res => res.json());
  },
  randomRecord(star){
    return fetch(`api/flipper/star${star}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },
  bloodPressureRecord(){
    return fetch(`api/flipper/bloodPressureTest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },
  bloodPressureCount(){
    return fetch(`api/flipper/bloodPressureCount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },
  resourceURL,
  /**
   * @param {string} pool
   * @returns {Promise<{data:Array<character>, total:number, report: {all_five: number, all_four: number, all_roll: number, all_three: number}}>}
   */
  roll (pool) {
    return fetch(`${baseURL}/wf/roll?pool=${pool}`)
      .then(res => res.json());
  },
  /**
   * @param {string} pool
   * @returns {Promise<{all_five: number, all_four: number, all_roll: number, all_three: number}>}
   */
  report (pool) {
    return fetch(`${baseURL}/wf/result/roll_data?pool=${pool}`)
      .then(res => res.json());
  },
  search (pool, num) {
    return fetch(`${baseURL}/wf/result?pool=${pool}&roll=${num}`)
      .then(async res => ResponseHandler(res));
  },
  pool () {
    return fetch(`${baseURL}/wf/result/pool_list`)
      .then(res => res.json());
  },
  getZoom (width) {
    if (width >= 600) return 1.5;
    return width / 50 * 0.125;
  },
  /**
   *
   * @param pool
   * @returns {Promise<{last_run_time:string, report:array<character & {total:number}>}>}
   */
  getCharacterReport (pool) {
    return fetch(`${baseURL}/wf/result/character_report?pool=${pool}`)
      .then(async res => ResponseHandler(res));
  },
  round (num) {
    return (Math.round(num * 10000) / 100).toFixed(2);
  }
};
