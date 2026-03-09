const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get('/whoami', (req, res) =>{
    res.status(200).json({
        studentNumber: "2768898"
    });
});

app.get('/books', (req, res) =>{
    res.status(200).json(books)
});

app.get('/books/:id', (req, res) =>{
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
});

app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = {
        id: String(id),
        title,
        details: details || []
    };

    books.push(newBook);
    res.status(201).json(newBook);
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});