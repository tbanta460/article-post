const {Op,ValidationError} = require('sequelize');
const {Article} = require('../../models/index.js');

// Get Article
exports.getArticles = async (req,res) => {
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 5
    const count = (currentPage - 1) * perPage
    try{
        const totalArticles = await Article.findAll({where:{Status: 'publish'}});
        const findArticles = await Article.findAll({ offset: parseInt(count), limit:parseInt(perPage), where:{Status: 'publish'}});
        res.status(200).json({
            message: "Berhasil Mengambil Posts",
            data: findArticles,
            totalPosts: totalArticles.length,
            currentPage,
            perPage,
            success: true
        })
        
    }catch(ValidationError){
        res.status(404).send({message: `Terjadi Kesalahan ${ValidationError}`, success: false, ValidationError})
    }
}
exports.getAllArticles = async (req,res) => {
    
    try{
        const findArticles = await Article.findAll();
        res.status(200).json({
            message: "Berhasil Mengambil Posts",
            data: findArticles,
            success: true
        })
        
    }catch(ValidationError){
        res.status(404).send({message: `Terjadi Kesalahan ${ValidationError}`, success: false, ValidationError})
    }
}
exports.getArticleById = async (req,res) => {
    const getIdArticle = req.params.id;

    try{
        const findArticle = await Article.findAll({where:{Id:getIdArticle}});
        if(findArticle.length === 0){
            res.status(500).send({
                message: "Post Dengan Id Yang Diminta Tidak Ditemukan",
                success: false
            })
        }
        res.status(200).json({
            message: "Berhasil Mengambil Post",
            data: findArticle,
            success: true
        })
    }catch(ValidationError){
        res.status(404).send({message: `Terjadi Kesalahan ${ValidationError}`, success: false, ValidationError})
    }
}

// Create Article
exports.createArticle = async (req,res) => {
    const {title,content,category,status} = req.body;

    try{
        if((title === "") || (content === "")){
            res.status(400).send({message: "Gagal Membuat Post, Pastikan Field Tidak Kosong", success: false})
        }
        let objArticle = {
            Title:title,Content:content,Category:category,Status:status
        }
        const data = await Article.create(objArticle)
    
        res.status(200).json({
            message: "Berhasil Membuat Post",data,success:true
        })
       
    }catch(ValidationError){
        res.status(404).send({message: `Terjadi Kesalahan ${ValidationError}`, success: false, ValidationError})
    }
}

// Update Article
exports.updateArticle = async (req, res) => {
    const getArticleId = req.params.id;
    try{
        const {title,content,category,status} = req.body;
        let objArticle = {
            Title:title,Content:content,Category:category,Status:status
        }
        if((title === "") || (content === "")){
            res.status(400).send({message: "Gagal Memperbarui Post, Pastikan Field Tidak Kosong", success: false})
        }
        const resUpdate = await Article.update(objArticle, {
            where: {
            Id: getArticleId
            }
        });
        if(resUpdate === 0){
            res.status(500).send({
                message: "Post Tidak Ditemukan",
                success: false
            })
        }
        res.status(200).json({
            message: "Berhasil Memperbarui Post",
            data: resUpdate,
            success: true
        });
    }catch(ValidationError){
        res.status(404).send({message: `Terjadi Kesalahan ${ValidationError}`, success: false, ValidationError})
    }
}

// Delete Article
exports.deleteArticle = async (req, res) => {
    const getIdArticle = req.params.id
    try{
        const resDelete = await Article.destroy({
            where: {
              Id: getIdArticle
            }
        });
        if(resDelete === 0){
            res.status(500).send({
                message: "Post Tidak Ditemukan",
                success: false
            })
        }
        res.status(200).json({
            message: "Berhasil Menghapus Post",
            data: resDelete,
            success: true
        })
    }catch(ValidationError){
        res.status(404).send({message: `Terjadi Kesalahan ${ValidationError}`, success: false, ValidationError})
    }
}