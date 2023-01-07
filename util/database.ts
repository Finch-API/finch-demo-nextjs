/*
    This is not secure!
    This is only for demo purposes.
    Storing access tokens in a secure database and retrieved from a backend server ideal. 

    [insert link to docs]
*/
import { JsonDB, Config } from 'node-json-db';
var db = new JsonDB(new Config("database.json", true, false, '/'));

interface connection {
    current_connection: string
}

var database = {
    setConnection: function (access_token: string) {
        return db.push('/current_connection', access_token);
    },
    getConnection: async function () {
        try {
            return await db.getObject<connection>('/current_connection')
        }
        catch (err) {
            return null
        }
    }
}

export default database