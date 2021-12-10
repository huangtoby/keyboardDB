const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM keyboard;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchName(name,mech,mac) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM keyboard WHERE keyboard_name LIKE ?;`;
                connection.query(query, ['%'+name+'%'], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchFilter(name,mech,mac) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM keyboard WHERE mechanical=${mech} AND mac_spec=${mac} AND keyboard_name LIKE ?;`;
                connection.query(query, ['%'+name+'%'], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async findRetail(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT retailer.retailer_name,keyboard_name,price,rating,delivery_options,return_days, link FROM retailer JOIN source WHERE (keyboard_name = ? OR keyboard_name IS NULL) AND retailer.retailer_name = source.retailer_name;";
                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getTopPicks() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM (SELECT keyboard.keyboard_name,mechanical,connection,backlight,layout,mac_spec,ROUND(AVG(rating),1)rating,min(price)price FROM keyboard JOIN source WHERE keyboard.keyboard_name = source.keyboard_name GROUP BY keyboard.keyboard_name, mechanical,connection,backlight,layout,mac_spec ORDER BY price) AS A WHERE (mechanical=mechanical OR mechanical IS NULL) AND (connection=connection OR connection IS NULL) AND (backlight=backlight or backlight IS NULL) AND (layout=layout or layout IS NULL) AND (mac_spec= mac_spec or mac_spec IS NULL) AND (price<=price or price IS NULL) AND (rating>=rating or rating IS NULL);"

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async filterTable(mech,mac) {
        
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM keyboard WHERE mechanical=${mech} AND mac_spec=${mac};`
                
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
                
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;