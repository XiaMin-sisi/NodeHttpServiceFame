//入口文件--开启服务器
//引用请求监听文件
let listen=require('./utils/listen')

//创建开启http服务
let httpserver=require("http").createServer();

//监听服务
httpserver.on("request",listen)

//开启服务--端口号根据自己需求设置
httpserver.listen(3002,function(){
    console.log("服务器开启成功,你可以通过http://localhost:3002/进行访问");
});