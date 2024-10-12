import Product from "../models/productModel.js";
import ImgProduct from "../models/imgProduct.js";
import path from 'path';
import fs from "fs";

export const getProduck = async (req, res) => {
    try {
        const response = await Product.findAll({
            attributes: ["id", "name", "catagoty", "brand", "description", "price"],
            include: {
                model: ImgProduct,
                attributes: ["img_name", "img_url", "productId"]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: 'syntax error' })
    };
};

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            attributes: ["id", "name", "catagoty", "brand", "description", "price"],
            where: {
                id: req.params.id
            }, include: {
                model: ImgProduct,
                attributes: ["img_name", "img_url", "productId"]
            }
        });
        if (!response) return res.status(404).json({ msg: 'product tidak di temukan' })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: "syntax error" })
    };
};

export const createProduct = async (req, res) => {
    if (!req.files) return res.status(400).json({ msg: "files tidak boleh kosong" })
    const { name, catagoty, brand, description, price } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowImg = [".jpg", ".jpeg", "png"];

    const existingFile = await ImgProduct.findOne({
        where: {
            img_name: fileName
        },
    });
    if (existingFile) return res.status(400).json({ msg: "file sudah ada, gunakan file atau foto lain!!!" });

    if (!allowImg.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: 'file harus .jpg atau .jpeg atau .png' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'file tidak boleh lebih dari 5 MB' });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: 'syntax file.mv error' });
        try {
            const produck = await Product.create({
                name, catagoty, brand, description, price
            });
            const imgProduct = await ImgProduct.create({
                img_name: fileName,
                img_url: url
            });

            try {
                // Gunakan alias saat memanggil metode
                await produck.setImgProduct(imgProduct); // Gunakan 'imgProduct' jika Anda menggunakan alias
                res.status(200).json({ msg: 'product telah di buat' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ msg: "error association" });
            }

        } catch (error) {
            res.status(500).json({ msg: 'syntax create produck error' });
        }
    })
}

export const updateProduct = async (req, res) => {
    const response = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: ImgProduct
        }
    });
    if (!response) return res.status(404).json({ msg: "product tidak di temukan" });

    let fileName = "";
    if (req.files === null || req.files === response.ImgProduct.img_name) {
        fileName = response.ImgProduct.img_name;
    } else {

        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowImg = [".png", '.jpeg', '.jpg'];

        if (!allowImg.includes(ext.toLocaleLowerCase())) return res.status(422).json({ msg: 'file harus .jpg atau .jpeg atau .png' });
        if (fileSize > 5000000) return res.status(422).json({ msg: 'file tidak bileh lebih dari 5 MB' });

        const filePath = `./public/images/${response.ImgProduct.img_name}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: 'file syntax error' });
        });
    };

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const { name, catagoty, brand, description, price } = req.body;

    try {
        await Product.update({
            name, catagoty, brand, description, price
        }, {
            where: {
                id: response.id
            }
        });

        await ImgProduct.update({
            img_name: fileName,
            img_url: url
        }, {
            where: {
                productId: response.ImgProduct.productId
            }
        });

        res.status(200).json({ msg: 'product telah di update' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'syntax error' });
    };
};

export const deleteProduct = async (req, res) => {
    const response = await Product.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: ImgProduct
        }
    });
    if (!response) return res.status(404).json({ msg: 'produck tidak di temukan' });

    // console.log(response.ImgProduct.img_name)

    try {
        const filePath = `./public/images/${response.ImgProduct.img_name}`;
        fs.unlinkSync(filePath);

        await Product.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({ msg: 'produck telah di hapus' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'syntax error' })
    };
};