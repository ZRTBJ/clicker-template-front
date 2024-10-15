import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const createSquad = (initData, user_id, link) => {
  return client.post('/create_squad', {initdata:WebApp.initData, user_id : user_id, link:link});
};
