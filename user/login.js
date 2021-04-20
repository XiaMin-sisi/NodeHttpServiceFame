/*
账号登录接口参数说明
参数：
userName *
passWord *
*/

//导入 mysql核心 和 mysql 的配置
let {mysql,mysqlConf}= require('../utils/connectMysql');

module.exports=(obj,callback)=>{ // obj是什么？看 util/listen.js 38行中传的参数是什么，callback是一个回调函数
    //检查请求方法对不对
    if(obj.method==="post"){
        //检查必需参数是否都有
        if(!obj.postParams.userName||!obj.postParams.passWord)
        {
            //返回数据给前端 ，第一个参数是 http 状态码，第二个参数是给前端的数据
            callback(502,"必要参数缺失或不正确");
            return ;
        }
        //连接数据库
        let connect=mysql.createConnection(mysqlConf);
        let sql=`select * from accountTb where accountNum = '${obj.postParams.userName}' and accountPwd = "${obj.postParams.passWord}"`;
        //执行 sql
        connect.query(sql,(error,res)=>{
            if(error)
            {
                //如果执行sql出错了，返回数据给前端 ，第一个参数是 http 状态码，第二个参数是给前端的数据
                callback(200,{success:false,message:"未知错误",code:1003,data:error})
            }
            else {
                    //如果执行sql成功，返回数据给前端 ，第一个参数是 http 状态码，第二个参数是给前端的数据
                    callback(200,{success:true,message:"登录成功",code:0,data:res[0]});
                    /*
                        需要注意的是你执行一次 sql 之后，如果还需要进行一次数据库操作，
                        需要再次连接数据库 connect=mysql.createConnection(mysqlConf);
                    */
            }
        });
        //关闭连接
        connect.end();
    }
    else {
        callback(501,"请求方式不正确，请使用Post请求！");
    }

}