module.exports = {             
    sessionSecret : 'tokune',
    dev_mode      : true,
    title         : 'Tokune Note',
    port          : 7623,
    mysql         : {
        database : "notes",
        protocol : "mysql",
        host     : "127.0.0.1",
        user     : "root",
        password : "pwd",
        query    :{
            pool : true,
        }
    }
}
