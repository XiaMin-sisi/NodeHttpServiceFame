//文件上传接口示例
let fs=require('fs')
module.exports=({getParams,postParams,chunks,num},callback)=>{

    /*
        这是一个文件上传的示例，事实上，你的后端接口只需要一个文件上传的接口。
        你只需要通过前端传过来的数据设置文件存放的位置即可，在本代码的 34 行，设置 address 即可
    */


    //最终流的内容本体
    let buffer=Buffer.concat(chunks,num);

    //新建数组接收出去\r\n的数据下标
    let rems=[];

    //根据\r\n分离数据和报头
    for (let i = 0; i < buffer.length; i++) {
        let v=buffer[i];
        let v2=buffer[i+1];
        // 10代表\n 13代表\r
        if (v==13&&v2==10) {
            rems.push(i)
        }
    }

    //获取上传文件信息
    let picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();

    let filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];

    //文件数据
    let nbuf = buffer.slice(rems[3]+2,rems[rems.length-2]);
    let address="./public/file/"+filename;

    //创建空文件并写入内容
    fs.writeFile(address,nbuf,function(err){
        if (err) {
            callback(200,{success:false,message:"未知错误",code:1003,data:"error"})
        }else{
            callback(200,{success:true,message:"上传成功",code:0,data:"success"})
        }
    })

}