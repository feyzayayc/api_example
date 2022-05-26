const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const kullanicilar = [
    { id: 1, name: "user1", age: 10 },
    { id: 2, name: "user2", age: 20 },
    { id: 3, name: "user3", age: 30 },
    { id: 4, name: "user4", age: 40 }
]




// --------------- GET İŞLEMLERİ -----------------

app.get('/', (req, res) => {
    res.send("anasayfa")
});

app.get('/users', (req, res) => {
    if (req.query.ters) {
        // 
        res.send(kullanicilar.reverse());
    }
    else {
        res.send(kullanicilar);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    // res.send(kullanicilar[id-1]);
    // bunu ben yazdım daha kolay :)

    const bulunanKullanici = kullanicilar.find(kisi => kisi.id == id);
    if (bulunanKullanici) {
        res.send(bulunanKullanici);
    }
    else {
        res.send("bulunamadı")
    }
});

// ----------------- POST İŞLEMLERİ---------------

app.post('/users', (req, res) => {

    const { error } = kullaniciBilgileriniOnayla(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }

    else {
        const yeniUser = {
            id: kullanicilar.length + 1,
            name: req.body.name,
            age: req.body.age
        }

        kullanicilar.push(yeniUser);
        res.send(kullanicilar);
    }

});


// ----------------- PUT İŞLEMLERİ---------------

app.put("/users/:id", (req, res) => {
    const { error } = kullaniciBilgileriniOnayla(req.body);
    const id = req.params.id;
    const bulunanKullanici = kullanicilar.find(kisi => kisi.id == id)
    if (bulunanKullanici) {
        if (error) {
            res.status(400).send(error.details[0].message);
        }
        else {
            bulunanKullanici.name = req.body.name;
            bulunanKullanici.age = req.body.age;
            res.send(kullanicilar);
        }

    }
    else {
        return res.status(404).send(req.params.id + "'li kayıt bulnamadı");
    }
});

// ----------------- DELETE İŞLEMLERİ---------------

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const bulunanKullanici = kullanicilar.find(kisi => kisi.id == id);

    if (bulunanKullanici) {
        const index = kullanicilar.indexOf(bulunanKullanici);
        kullanicilar.splice(index, 1); // index'ten başla 1 eleman sil
        res.send(bulunanKullanici);
    }
    else {
        res.status(404).send("Kullanıcı bulunamadı")
    }
});

// --------------- Veri Kontrolr ---------------
function kullaniciBilgileriniOnayla(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        age: Joi.number().integer().min(10).max(99).required()
    });
    const sonuc = schema.validate(user); // schema'da verilen değerlere göre 
    return sonuc;

}

// --------------- SERVER BAŞLATMA ----------------
app.listen(3000, () => {
    console.log('listening on port 3000');
});