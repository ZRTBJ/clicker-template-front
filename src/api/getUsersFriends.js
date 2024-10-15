import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const get_users_friends = (initdata, user_id) => {
  return client.post('/get_users_friends', {initdata:WebApp.initData, user_id : user_id });
};
