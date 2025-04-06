const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Armazenamento temporário (simulando banco de dados)
const users = [];
const plantations = [];
const products = [];
const categories = [];
const harvests = [];
const supplies = [];

// Endpoints de Usuários
app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.status(201).json(user);
});
app.put('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Usuário não encontrado.');
    users[index] = { id: users[index].id, ...req.body };
    res.json(users[index]);
});
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Usuário não encontrado.');
    users.splice(index, 1);
    res.status(204).send();
});

// Endpoints de Plantações
app.get('/api/plantations', (req, res) => res.json(plantations));
app.post('/api/plantations', (req, res) => {
    const plantation = { id: Date.now(), ...req.body };
    plantations.push(plantation);
    res.status(201).json(plantation);
});
app.put('/api/plantations/:id', (req, res) => {
    const index = plantations.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Plantação não encontrada.');
    plantations[index] = { id: plantations[index].id, ...req.body };
    res.json(plantations[index]);
});
app.delete('/api/plantations/:id', (req, res) => {
    const index = plantations.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Plantação não encontrada.');
    plantations.splice(index, 1);
    res.status(204).send();
});

// Endpoints de Produtos
app.get('/api/products', (req, res) => res.json(products));
app.post('/api/products', (req, res) => {
    const product = { id: Date.now(), ...req.body };
    products.push(product);
    res.status(201).json(product);
});
app.put('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Produto não encontrado.');
    products[index] = { id: products[index].id, ...req.body };
    res.json(products[index]);
});
app.delete('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Produto não encontrado.');
    products.splice(index, 1);
    res.status(204).send();
});

// Endpoints de Categorias
app.get('/api/categories', (req, res) => res.json(categories));
app.post('/api/categories', (req, res) => {
    const category = { id: Date.now(), ...req.body };
    categories.push(category);
    res.status(201).json(category);
});
app.put('/api/categories/:id', (req, res) => {
    const index = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Categoria não encontrada.');
    categories[index] = { id: categories[index].id, ...req.body };
    res.json(categories[index]);
});
app.delete('/api/categories/:id', (req, res) => {
    const index = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Categoria não encontrada.');
    categories.splice(index, 1);
    res.status(204).send();
});

// Endpoints de Safras
app.get('/api/harvests', (req, res) => res.json(harvests));
app.post('/api/harvests', (req, res) => {
    const harvest = { id: Date.now(), ...req.body };
    harvests.push(harvest);
    res.status(201).json(harvest);
});
app.put('/api/harvests/:id', (req, res) => {
    const index = harvests.findIndex(h => h.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Safra não encontrada.');
    harvests[index] = { id: harvests[index].id, ...req.body };
    res.json(harvests[index]);
});
app.delete('/api/harvests/:id', (req, res) => {
    const index = harvests.findIndex(h => h.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Safra não encontrada.');
    harvests.splice(index, 1);
    res.status(204).send();
});

// Endpoints de Insumos
app.get('/api/supplies', (req, res) => res.json(supplies));
app.post('/api/supplies', (req, res) => {
    const supply = { id: Date.now(), ...req.body };
    supplies.push(supply);
    res.status(201).json(supply);
});
app.put('/api/supplies/:id', (req, res) => {
    const index = supplies.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Insumo não encontrado.');
    supplies[index] = { id: supplies[index].id, ...req.body };
    res.json(supplies[index]);
});
app.delete('/api/supplies/:id', (req, res) => {
    const index = supplies.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Insumo não encontrado.');
    supplies.splice(index, 1);
    res.status(204).send();
});

// Inicializando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
