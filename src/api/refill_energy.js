import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const refill_energy = (initdata, user_id) => {
  return client.post('/refill_energy', {initdata:WebApp.initData, user_id : user_id});
};
