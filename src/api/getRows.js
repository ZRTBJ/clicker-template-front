import { client } from "../utils/fetchClient";

var WebApp = window.Telegram.WebApp;
export const getRows = (table, limit, offset, sort_key, sort_direction, initdata = WebApp.initData) => {
  console.log(initdata)
  return client.post('/get_rows', {initdata:initdata, table : table, limit:limit, offset:offset , sort_key:sort_key, sort_direction:sort_direction});
};
