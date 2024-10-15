import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const buyBooster = (initData, user_id, booster) => {
  return client.post('/buy_booster', {initdata:WebApp.initData, user_id : user_id, booster:booster});
};
