const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname, 'folder'), (err)=>{
//     if(err) throw new Error(err.message)
// })

// fs.mkdir(path.join(__dirname, 'folder', 'folder1'), (err)=>{
//     if(err) throw new Error(err.message)
// })

// fs.mkdir(path.join(__dirname, 'folder', 'folder2'), (err)=>{
//     if(err) throw new Error(err.message)
// })
// fs.mkdir(path.join(__dirname, 'folder', 'folder3'), (err)=>{
//     if(err) throw new Error(err.message)
// })
// fs.mkdir(path.join(__dirname, 'folder', 'folder4'), (err)=>{
//     if(err) throw new Error(err.message)
// })
// fs.mkdir(path.join(__dirname, 'folder', 'folder5'), (err)=>{
//     if(err) throw new Error(err.message)
// })

// fs.writeFile(path.join(__dirname, 'folder', 'file1.js'), 'file1.js' , (err)=>{
//     if(err) throw new Error(err.message)
// })

// fs.writeFile(path.join(__dirname, 'folder', 'file2.js'), 'file2.js' , (err)=>{
//     if(err) throw new Error(err.message)
// })
// fs.writeFile(path.join(__dirname, 'folder', 'file3.js'), 'file3.js' , (err)=>{
//     if(err) throw new Error(err.message)
// })
// fs.writeFile(path.join(__dirname, 'folder', 'file4.js'), 'file4.js' , (err)=>{
//     if(err) throw new Error(err.message)
// })
// fs.writeFile(path.join(__dirname, 'folder', 'file5.js'), 'file5.js' , (err)=>{
//     if(err) throw new Error(err.message)
// })

fs.readdir(path.join(__dirname, 'folder'), {withFileTypes:true}, (err, files)=>{
    if(err) throw new Error(err.message);
    files.map(file=>{
        if (file.isFile()){
            console.log(`FILE: ${file.name}`)
        } else if(file.isDirectory()){
            console.log(`FOLDER: ${file.name}`)
        }

    })
})