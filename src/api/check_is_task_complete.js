import { client } from "../utils/fetchClient";
var WebApp = window.Telegram.WebApp;
export const check_is_task_complete = (initData, user_id, taskId) => {
  return client.post('/check_is_task_completed', {initdata:WebApp.initData, taskId:taskId, user_id : user_id});
};
