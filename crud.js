const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let animals = [
    { id: 1, name: 'Lion', species: 'Mammal' },
    { id: 2, name: 'Eagle', species: 'Bird' },
    { id: 3, name: 'pigeon', species: 'Bird' },
    { id: 4, name: 'owl', species: 'Bird' },
    { id: 5, name: 'Snake', species: 'Reptile' }
];

app.get('/', (req, res)=>{
    res.send('Hello World!');
    res.send()
})

// GET all animals
app.get('/animals', (req, res) => {
    res.json(animals);
});

app.get('/animals/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const animal = animals.find(animal => animal.id === id);
    if (!animal) {
        return res.status(404).json({ error: 'Animal not found' });
    }
    res.json(animal);
});

// POST a new animal
app.post('/animals', (req, res) => {
    const newAnimal = req.body;
    animals.push(newAnimal);
    res.status(201).json(newAnimal);
});

// PUT update an existing animal
app.put('/animals/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAnimal = req.body;
    animals = animals.map(animal => {
        if (animal.id === id) {
            return {
                id: id,
                name: updatedAnimal.name || animal.name,
                species: updatedAnimal.species || animal.species
            };
        }
        return animal;
    });
    res.json(animals.find(animal => animal.id === id));
});

// DELETE an animal
app.delete('/animals/:id', (req, res) => {
    const id = parseInt(req.params.id);
    animals = animals.filter(animal => animal.id !== id);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
