import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const equip_skin = (initData, user_id, item) => {
  return client.post('/equip_skin', {initdata:WebApp.initData, user_id : user_id, item:item});
};
