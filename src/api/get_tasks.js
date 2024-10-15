import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const get_tasks = () => {
  return client.post('/get_tasks', {initdata:WebApp.initData});
};
