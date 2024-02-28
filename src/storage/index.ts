import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("testSQL1", "admin", "1111", {
    host: "127.0.0.1",
    port: 49740,
    dialect: 'mssql',
    dialectModule: require("tedious"),
});

export const parseFindResult = <T>(arr: any[]): T[] => arr.map(el => el.dataValues);



(async () => {
    try {
        await sequelize.authenticate({logging:false});
        await sequelize.sync({alter:true})        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

export default sequelize;