var Database = function() {
    this.dataBase = openDatabase('mydb1', '1.0', 'Test DB', 2 * 1024 * 1024);
};

Database.prototype.createTables = function() {
    this.dataBase.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS USER (user_id INTEGER PRIMARY KEY AUTOINCREMENT, login_id TEXT,password TEXT, role_id NUMBER, user_name TEXT, gender TEXT NOT NULL);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS ROLE (role_id INTEGER PRIMARY KEY, role_type TEXT);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS ACCOUNT (transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, transaction_amount NUMBER, transaction_date TIMESTAMP DEFAULT (datetime('now','localtime')));");
        tx.executeSql("CREATE TABLE IF NOT EXISTS ORDER_LIST (order_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, order_date TIMESTAMP DEFAULT (datetime('now','localtime')));");
        tx.executeSql("CREATE TABLE IF NOT EXISTS CURRENT_ITEM (date TIMESTAMP DEFAULT (datetime('now','localtime')), item TEXT);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS FEEDBACK (feedback_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER,feedback_content TEXT,feedback_time TIMESTAMP DEFAULT (datetime('now','localtime')), reply_id INTEGER);");
    });
};

Database.prototype.deleteTables = function(dataBase) {
    this.dataBase.transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS USER;");
        tx.executeSql("DROP TABLE IF EXISTS ROLE;");
        tx.executeSql("DROP TABLE IF EXISTS ACCOUNT;");
        tx.executeSql("DROP TABLE IF EXISTS ORDER_LIST;");
        tx.executeSql("DROP TABLE IF EXISTS CURRENT_ITEM;");
        tx.executeSql("DROP TABLE IF EXISTS FEEDBACK;");
    });
};

Database.prototype.dummyInsertInTables = function(dataBase) {
    this.dataBase.transaction(function(tx) {
        tx.executeSql("INSERT INTO USER (user_name,password,role_id,login_id,gender) VALUES ('sandwitch','dsfdsfs',5,'hdfgdfg','M');");
        //tx.executeSql("INSERT INTO ROLE (role_id,role_type) VALUES (1,'admin');");
        tx.executeSql("INSERT INTO ACCOUNT (user_id,transaction_amount) VALUES (55,100.5);");
        tx.executeSql("INSERT INTO ORDER_LIST (user_id) VALUES (1);");
        tx.executeSql("INSERT INTO CURRENT_ITEM (item) VALUES ('sandwitch');");
        tx.executeSql("INSERT INTO FEEDBACK (user_id,feedback_content) VALUES (55,'fdsfdsfdsfs')");
    });
};