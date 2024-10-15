import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const claim_tapbot_coins = (userId) => {
  return client.post('/claim_tapbot_coins', {initdata:WebApp.initData, user_id:userId });
};
