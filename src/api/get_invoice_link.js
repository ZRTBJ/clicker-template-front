import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const get_invoice_link = (initData, user_id, item) => {
  return client.post('/get_invoice_link', {initdata:WebApp.initData, user_id : user_id, item:item});
};
