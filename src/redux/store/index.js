import AsyncStorage from "@react-native-async-storage/async-storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { reducer } from "../reducers";
import { idDevice } from "../../config";

const encryptor = encryptTransform({  
    secretKey: idDevice, 
    onError: (error) =>{  if(__DEV__)console.log("Error encryptor store ", error) }
});

const configPersist = {
    key: "root",
    storage: AsyncStorage,
    transforms: [encryptor]
};

const perstReducer = persistReducer(configPersist, reducer);

const middleware = applyMiddleware(thunk);

const store = createStore( perstReducer, composeWithDevTools(middleware));

const persistor = persistStore(store);

export { store, persistor };
