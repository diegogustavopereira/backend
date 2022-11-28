import express from 'express';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app = express();
app.use(express.json());

let data = [
    { 
    "name": "Diego Gustavo Pereira", 
    "status": "ativo", 
    "unidade": "Vara Cível",
    "comarca": "Capanema",
    "id": "e27ab2b1-cb91-4b18-ab90-5895cc9abd29"
    }
];

//ROTAS

//GET
app.get('/all', (request, response) => {
    return response.status(200).json(data);
});

//POST
app.post('/create', (request, response) => {
    const newData = {
        //captura o body da requisição e adiciona um id
        ...request.body,
        id: uuidv4()
    };

    data.push(newData);

    return response.status(201).json(data);
});

//PUT
app.put('/edit/:id', (request, response) => {
    //indica o id como parâmetro
    const { id } = request.params;

    //localiza o id
    const update = data.find(
        item => item.id === id
    );

    //obtem a posição do registro
    const index = data.indexOf(update);

    //atualiza o item existente
    data[index] = {
        ...update,
        ...request.body
    };

    return response.status(200).json(data[index]);
})

//DELETE

app.delete('/delete/:id', (request, response) => {
    //indica o id como parâmetro
    const { id } = request.params;

    //localiza o id
    const deleteById = data.find(
        item => item.id === id
    );

    const index = data.indexOf(deleteById);

    data.splice(index, 1);

    return response.status(200).json(data);

})

app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'));


