import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const getSquads = (initdata) => {
  return client.post('/get_squads', {initdata:WebApp.initData});
};
