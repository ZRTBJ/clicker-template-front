import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const getUsers = (initdata) => {
  return client.post('/get_users', {initdata:WebApp.initData});
};
