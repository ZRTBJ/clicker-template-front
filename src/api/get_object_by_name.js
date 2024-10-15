import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const get_object_by_name = ( table, name) => {
  return client.post('/get_object_by_name', {initdata:WebApp.initData, table : table, name:name});
};
