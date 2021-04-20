//通过路径的判断请求不同的接口
let {splitUrl}=require('./util');
let fs = require("fs");
let Url= require("url");

module.exports=(request,response)=>{
    let url=`.${Url.parse(request.url,true).pathname}.js`;  //获取请求路径
    let method=request.method.toLowerCase();    //请求方式
    let getParams=Url.parse(request.url,true).query;    //获取路径上请求参数 -- get参数
    let postParams="";  //post 请求的参数

    //前端上传的文件数据
    let chunks=[];  // 数组保存文件流
    let num=0;  // 获取长度

    //获取 post 数据
    request.on("data",(data)=>{
        postParams+=data;
        chunks.push(data);
        num+=data.length;
    });

    //请求结束后进行数据响应
    request.on("end",()=>{
        let postData=postParams;
        //将非 get 请求的参数转化成对象
        try {
            postParams = eval('(' + postParams + ')');
        } catch (e) {
            postParams = postData;
            console.log("----postParams to json error:" + "\n" + e + '\n' + '----error end!\n');
        }

        //判断请求路径是否存在，每一个请求路径都对应服务器的一个文件路径，即判断该文件存在与否
        fs.promises.access(`${url}`).then(
            ()=>{
                //请求路径存在,获取对应接口的数据
                require('.'+url)({getParams,postParams,method,chunks,num,response},(code,data)=>{
                    if(code==200){
                        response.writeHead(code, {'Content-Type': 'application/json'});//设置响应的数据类型
                        //发送响应信息
                        response.write(JSON.stringify(data));
                    }
                    if(code!=200){
                        //请求不正确，给出相应的提示
                        response.writeHead(code, {'Content-Type': 'text/plain'});
                        //发送响应
                        response.write(data);
                    }
                    //结束响应
                    response.end();
                })
            },
            (e)=>{
                //请求路径不存在，返回状态码 404
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write("Not Found!");
                console.log("----Not Found:"+"\n"+e+'\n'+'----error end!\n');
                response.end();
            })

    })


}