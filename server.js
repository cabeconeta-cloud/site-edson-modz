const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use('/download', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('Erro no upload.');
    const fileLink = `${req.protocol}://${req.get('host')}/download/${req.file.filename}`;
    res.json({ link: fileLink });
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
