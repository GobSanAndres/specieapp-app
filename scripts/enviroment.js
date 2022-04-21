const fs = require("fs");
const path = require("path");
const { argv } = require("yargs");

const { env } = argv;

const validEnv = ['dev', 'prod'];

const fileWrite = (file, text) => {
    if(fs.existsSync(file)){
        fs.writeFileSync(file, text);
        return true;
    }
    process.exit(1);
}


const validParams = () => {
    if(!env || !validEnv.includes(env))
        process.exit(1);
}

const changeEnviroment = () => {
    const textFile = `export * from './${env}'\n`;
    const location = path.resolve(
        __dirname,
        "..",
        "src",
        "config",
        "env",
        "index.js"
    );

    fileWrite(location, textFile);
    process.exit();
}

validParams();
changeEnviroment();