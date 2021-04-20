let mysql      = require('mysql');

module.exports={
    mysql:mysql,
    mysqlConf:{
        host     : 'localhost', //主机名
        user     : 'root',      //用户名
        password : '123456',    //数据库密码
        database : 'medicalresourceschedulingsystem'    //数据库名称
    }
}


