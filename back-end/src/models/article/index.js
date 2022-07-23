const {DataTypes} = require('sequelize');
const db = require('../../../config/db.js');

const Article = db.define('posts',{
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg: "Title Tidak Boleh Kosong"
            },
            len:{
                args:[20],
                msg: "Masukkan Title Anda Minimal 20 Karakter"
            }
        }
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg: "Content Tidak Boleh Kosong"
            },
            len:{
                args:[200],
                msg: "Masukkan Minimal 200 Karakter"
            }
        }
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg: "Category Tidak Boleh Kosong"
            },
            len:{
                args:[3],
                msg: "Masukkan Minimal 3 Karakter"
            }
        }
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg: "Tidak Boleh Kosong"
            }
        }
    }
},{freezeTableName: true});


module.exports = Article
