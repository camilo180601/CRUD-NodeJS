var express = require('express');
var router = express.Router();
const librosController= require("../controllers/librosController");

var multer = require('multer');
var fecha = Date.now();

var rutaAlmacen = multer.diskStorage(
    {
        destination:function name(request, file, callback){
            callback(null,'./public/images/');
        },
        filename:function name(request, file, callback){
            console.log(file);
            callback(null,fecha+"_"+file.originalname);
        }
    }
    
);
var cargar= multer({ storage:rutaAlmacen});

/* GET home page. */
router.get('/',librosController.index);
router.get('/crear',librosController.crear);
router.post("/",cargar.single("archivo"),librosController.guardar);
router.post('/eliminar/:id',librosController.eliminar);
router.post('/editar/:id',librosController.editar);
router.post("/actualizar",cargar.single("archivo"),librosController.actualizar);


module.exports = router;
