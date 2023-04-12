/*
    This is not secure!
    This is only for demo purposes.
    Storing access tokens in a secure database and retrieved from a backend server is ideal. 

    [insert link to docs]
*/
import { JsonDB, Config } from 'node-json-db';
var db = new JsonDB(new Config("database.json", true, false, '/'));

interface connection {
    current_connection: string
}

var database = {
    setConnectionToken: function (access_token: string) {
        db.push('/is_sandbox', false)
        return db.push('/current_connection', access_token);
    },
    setSandboxToken: function (access_token: string) {
        db.push('/is_sandbox', true)
        return db.push('/current_connection', access_token);
    },
    getConnectionToken: async function () {
        try {
            return await db.getObject<connection>('/current_connection')
        }
        catch (err) {
            return null
        }
    },
    deleteConnectionToken: async function () {
        try {
            return await db.delete('/current_connection')
        }
        catch (err) {
            return null
        }
    },
    isSandbox: async function () {
        try {
            return await db.getObject<boolean>('/is_sandbox')
        }
        catch (err) {
            return null
        }
    }
}

export default database