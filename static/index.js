//请求服务器中的静态资源，而非下载。
let fs=require('fs')
module.exports=({getParams,postParams,chunks,num,response},callback)=>{
    /*
        这只是一个示例
        具体的文件名，需要通过 get 请求的参数进行获取设置。
        具体的文件路径你可以自己设置，不一定要像我的文件路径 ./public/avatar/bg.png
        特别需要注意的是 ./ 当前目录代表的是入口文件所在目录，而不是当前js 文件所在目录
    */


    //检查资源是否存在
    fs.promises.readFile("./public/avatar/bg1.png").then(    //文件存在
        (data)=>{
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.end(data);
            return false;
        }).catch(   //文件不存在
            (e)=>{
                console.log(e);
                return false;
            }
        )
}