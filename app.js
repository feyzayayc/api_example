const express = require('express');
const app = express();
const port = 3000;
const kullaniciRouter = require('./router/kullanici_router');
const anasayfaRouter = require('./router/anasayfa_router');
const bilinmeyenRouter = require('./router/404_router');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // formdan veiri almak için kullanılır. postman'de x-www-form... kısmı için
app.use(express.static("public")); // public dosyasının altındaki dosyalara dışarıdan ulaşılsın



app.get('/', anasayfaRouter);
app.use("/users",kullaniciRouter);

// app.use((req, res) => {
    // hatalı yönlendirmeler için kullanılacak
    // bu yönlendirme her istek için geçerli olacağından sona yazılmalıdır yoksa her istek hata olarak döner
    // res.status(404).send("link hatalı");
// });

app.use(bilinmeyenRouter)


// --------------- SERVER BAŞLATMA ----------------
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});