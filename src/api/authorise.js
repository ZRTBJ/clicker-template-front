import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const authorise = (initdata, invitation_code) => {
  return client.post('/authorize', {initdata:WebApp.initData, invitCode : invitation_code});
};
