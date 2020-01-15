docker ps 

docker exec -it mongodb mongo -u rogeriorodrigues -p minhasenhasecreta --authenticationDatabase herois 

//Estrutura dinâmica 

db.herois.insert({
    nome: 'Flash', 
    poder: 'Velocidade', 
    dataNascimento: '19/01/01' 
})

for(let i = 0; i < 10000; i++){
    db.herois.insert({
        nome: `Clone ${i}`, 
        poder: 'Velocidade', 
        dataNascimento: '19/01/01' 
    })  
}

db.herois.findOne() 

db.herois.find({}, {poder: 1, _id: 0}).limit(5000).sort({nome: -1})

db.herois.find({}, {poder: 1}).limit(5000).sort({nome: -1})