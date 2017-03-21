 var WebSqlDB = function(successCallback, errorCallback) {
    this.initializeDatabase = function(successCallback, errorCallback) {
        // This here refers to this instance of the webSqlDb
        var self = this;
        // Open/create the database
        this.db = window.openDatabase("bioID", "1.0", "percistencia de dados", 200000);

        // WebSQL databases are tranaction based so all db querying must be done within a transaction
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    //self.addSampleData(tx);
                },
                function(error) {
                    console.log('Erro iniciar Banco de dados: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Banco de dados carregado com sucesso');
                    if (successCallback) successCallback();
                }
        )
    }
    this.createTable = function(tx) {

        // This can be added removed/when testing
        //tx.executeSql('DROP TABLE IF EXISTS cultivares');

        var sql = "CREATE TABLE IF NOT EXISTS cultivares ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nomecultivar, " +
            "imagem, " +
            "descricao, " +
            "biofortificado, " +
            "unidademedida, " +
            "valornutricional)";
        tx.executeSql(sql, null,
                function() {            // Success callback
                    console.log('Tabelas criadas com sucesso');
                },
                function(tx, error) {   // Error callback
                    alert('Erro ao criar tabelas: ' + error.message);
                });
    }
    this.addSampleData = function(tx, todos) {

        // Array of objects
        var todos = [
                {"id": 1, "nomecultivar": "Batata doce", "imagem": "Get milk and bread"},
                {"id": 2, "nomecultivar": "Mandioca", "imagem": "Collect mail"},
                {"id": 3, "nomecultivar": "Milho", "imagem": "About birthday"},
                {"id": 4, "nomecultivar": "Trigo", "imagem": "Well overdue"}
            ];
        var l = todos.length;
        var sql = "INSERT OR REPLACE INTO cultivares " +
            "(id, nomecultivar, imagem) " +
            "VALUES (?, ?, ?)";
        var t;
        // Loop through sample data array and insert into db
        for (var i = 0; i < l; i++) {
            t = todos[i];
            tx.executeSql(sql, [t.id, t.nomecultivar, t.imagem],
                    function() {            // Success callback
                        console.log('DEBUG - 4. Sample data DB insert success');
                    },
                    function(tx, error) {   // Error callback
                        alert('INSERT error: ' + error.message);
                    });
        }
    }
    this.findAll = function(callback) {

        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM cultivares";
                tx.executeSql(sql, [], function(tx, results) {
                    var len = results.rows.length,
                        todos = [],
                        i = 0;
                    // Semicolon at the start is to skip the initialisation of vars as we already initalise i above.
                    for (; i < len; i = i + 1) {
                        todos[i] = results.rows.item(i);
                    }
                    // Passes a array with values back to calling function
                    callback(todos);
                });
            },
            function(error) {
                alert("Transaction Error findAll: " + error.message);
            }
        );
    }
    this.findById = function(id, callback) {

        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM cultivares WHERE id=?";
                tx.executeSql(sql, [id], function(tx, results) {
                    // This callback returns the first results.rows.item if rows.length is 1 or return null
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }
    this.markCompleted = function(id, callback) {
        this.db.transaction(
            function (tx) {
                var sql = "UPDATE cultivares SET biofortificado=false WHERE id=?";
                tx.executeSql(sql, [id], function(tx, result) {
                    // If results rows return true
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }
    this.markOutstanding = function(id, callback) {
        this.db.transaction(
            function (tx) {
                var sql = "UPDATE cultivares SET biofortificado=true WHERE id=?";
                tx.executeSql(sql, [id], function(tx, result) {
                    // If results rows return true
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }
    this.insert = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = json;//JSON.parse(json),


        // Kept for for debuging
        //console.log("DEBUG - Inserting the following json ");
        //console.log(parsedJson);
        this.db.transaction(
           function (tx) {
                var sql = "INSERT INTO cultivares (nomecultivar, imagem) VALUES (?, ?)";
                tx.executeSql(sql, [parsedJson.nomecultivar, parsedJson.imagem], function(tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }
    this.update = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "UPDATE cultivares SET nomecultivar=?, imagem=? WHERE id=?";
                tx.executeSql(sql, [parsedJson.nomecultivar, parsedJson.imagem, parsedJson.id], function(tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                    // Kept for debugging
                    //console.log("Rows effected = " + result.rowsAffected);
                });
            }
        );
    }
    this.delete = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM cultivares WHERE id=?";
                tx.executeSql(sql, [parsedJson.id], function(tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                    //console.log("Rows effected = " + result.rowsAffected);
                });
            }
        );
    }
    this.initializeDatabase(successCallback, errorCallback);
}
