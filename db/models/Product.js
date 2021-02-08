const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
 return sequelize.define("Product", {
    name:{ type : DataTypes.STRING },
    price:{ type : DataTypes.INTEGER },
    description : {type : DataTypes.STRING },

})};
