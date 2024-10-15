import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const makeTaps = (initdata, user_id, taps) => {
  return client.post('/tap', {initdata:WebApp.initData, user_id : user_id, taps:taps});
};
