const fs = require('fs').promises;

const removefile = async (path) =>{
     let fileExists;
     console.log(path)
     try{
         await fs.access(path);
         fileExists = true;
     }catch{
        fileExists = false;
     }
     if(fileExists){
        await fs.unlink(path);
     }
     console.log(fileExists)


}
module.exports = removefile;