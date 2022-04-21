import DeviceInfo from "react-native-device-info";
import { api } from "./env";

export * from "./env";

export const idDevice = DeviceInfo.getUniqueId();

export const endPoint = {
    login: api + "/auth/app/login",
    getData: api + "/generic/app/getdata",
    saveData: api + "/generic/app/create",
    changePassword: api + "/user/app/update"
}