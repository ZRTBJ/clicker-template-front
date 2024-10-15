import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const add_task = (reward, channel_link, socnet) => {
  return client.post('/add_task', {initdata:WebApp.initData, reward:reward, channel_link:channel_link, socnet:socnet });
};
