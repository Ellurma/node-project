// const fs=require('fs');
// const path=require('path');
//
// const forSort=(read,gender,write)=>{
//
// fs.readdir(path.join(__dirname,read), (err,files)=>{
//     if (err) return console.log(err)
//
//     for (const file of files) {
//
//         const readFilePath=path.join(__dirname,read,file)
//
//         fs.readFile(readFilePath,(err,data)=>{
//             if (err) return console.log(err)
//            const user=JSON.parse(data.toString())
//
//             if(user.gender===gender){
//                 fs.rename(readFilePath,path.join(__dirname,write,file),(err)=> {
//                     if (err) return console.log(err)
//                 })
//             }
//         })
//     }
//
//
//
// })
// }
// forSort('girls','male','boys')
// forSort('boys','female','girls')
//




// const fs = require('fs/promises');
// const path = require('path');
//
// const forSort = async (read, gender, write) => {
//     try {
//         const files = await fs.readdir(path.join(__dirname, read))
//
//         for (const file of files) {
//
//             const readFilePath = path.join(__dirname, read, file)
//             const data = await fs.readFile(readFilePath)
//             const user = JSON.parse(data.toString())
//
//             if (user.gender === gender) {
//                 await fs.rename(readFilePath, path.join(__dirname, write, file))
//             }
//         }
//     } catch (e) {
//         console.error(e)
//
//     }
// }
// forSort('girls', 'male', 'boys')
// forSort('boys', 'female', 'girls')

const fs = require('fs/promises');
const path = require('path');

const reader=async (read)=>{
    try{
       const files=await fs.readdir(read)

        for (const file of files) {
            const stat=await fs.stat(path.join(read,file))

            if(stat.isFile()){
                await fs.rename(path.join(read,file), path.join(__dirname,'exitFolder',file))
            }
            if(stat.isDirectory()){
                await reader(path.join(read,file))
            }
        }

    }catch (e){
        console.error(e)
    }
}

reader(path.join(__dirname,'startFolder'))