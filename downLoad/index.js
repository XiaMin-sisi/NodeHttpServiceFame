//下载服务器中的文件
let fs=require('fs')

module.exports=({getParams,postParams,chunks,num,response},callback)=>{
    /*
        这是一个下载的示例。
        具体的文件名通过 get 请求获取
        具体的文件路径自己设置和更改，不一定要像我的./public/avatar/git.md
        特别需要注意的是 ./ 当前目录代表的是入口文件所在目录，而不是当前js 文件所在目录
    */

    //判断文件是否存在
    fs.promises.readFile("./public/avatar/git.md").then(    //文件存在
        (data)=>{
        response.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + "git.md",  //文件名根据前端的数据进行设置，我这里写死为了演示
        });
        response.end(data);
        return false;
    }).catch(   //文件不存在
        (e)=>{
            callback(200,{success:false,message:"请求的文件可能已被删除",code:1003,data:"error"})
            console.log(e);
            return false;
            }
        )

}