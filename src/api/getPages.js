import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const getPages = ( table, rows) => {
  return client.post('/get_pages', {initdata:WebApp.initData, table : table, rows:rows});
};
