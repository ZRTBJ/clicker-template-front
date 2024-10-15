import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const update_object = (initdata, objId, argdict, model) => {
  return client.post('/update_object', {initdata:WebApp.initData, objId : objId, argdict : argdict, model : model });
};
