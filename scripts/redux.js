const fs = require("fs");
const path = require("path");
const { argv } = require("yargs");

const { name } = argv;

const pathLocation = path.resolve(__dirname, "..", "src");

const pathBase = pathLocation + "/redux/";
const reducer = pathBase + "reducers/";
const action = pathBase + "actions/";
const middleware = pathLocation + "/middlewares/";

const strOne = name.substring(0, 1).toUpperCase();
const strComplete = name.substring(1, name.length);
const upperName = strOne + strComplete;
const upperNameComplete = name.toUpperCase();

const writeFile = (path, body) => {
    setTimeout(() => {
        fs.writeFile(path, body, function (error) {
            if(error) return console.error(error);
    
            console.log(path)
        })
    }, 2000);
}

const createDirectory = (directory) => {
    const pathDirectory = directory + name;
    if(!fs.existsSync(pathDirectory))
        fs.mkdir(directory + name, function (error) {
            if(error) return console.error(error);
    
            console.log(pathDirectory)
        })
}

/**
 * Creation reducer
 */

const directoryReducer = reducer + name;
if(!fs.existsSync(directoryReducer))
    fs.mkdir(reducer + name, function (error) {
        if(error) return console.error(error);

        console.log("create directory reducer ", reducer + name)
    })

const bodyReducer = `import produce from 'immer';

export function set${upperName}(state, payload) {
    return produce(state, (draft) => {
        draft.${name} = payload;
    })
}`;

const pathReducer = `${reducer}${name}/index.js`;
writeFile(pathReducer, bodyReducer);

/**
 * Actions
 */
createDirectory(action);

const bodyAction = `export const ${upperName}ActionTypes = {
    get${upperName}: 'GET_${upperNameComplete}'
}`;

const pathAction = `${action}${name}/${upperName}Actions.js`;
console.log("path creado ", pathAction);
writeFile(pathAction, bodyAction);

/**
 * ActionCreator
 * 
 */
 

const bodyActionCreator = `import { set${upperName} } from '../../reducers/${name}';
import { ${upperName}ActionTypes  } from './${upperName}Actions';

export const set${upperName}Creator = (payload) => ({
    type: ${upperName}ActionTypes.get${upperName},
    payload,
    reducer: set${upperName}
});`
const pathActionsCreator = `${action}${name}/${upperName}ActionCreator.js`;
console.log("path creado ", pathActionsCreator);

writeFile(pathActionsCreator, bodyActionCreator);

/***
 * middleware
 */
 createDirectory(middleware);

const bodyMiddleware = `import { set${upperName}Creator } from '../../redux/actions/${name}/${upperName}ActionCreator';

export const set${upperName}Middleware = (object) => {

    return function (dispatch){
        dispatch(set${upperName}Creator(object));
    }
}`;

const pathMiddleware = `${middleware}${name}/${name}Middleware.js`;
console.log("path creado ", pathMiddleware);

writeFile(pathMiddleware, bodyMiddleware);


