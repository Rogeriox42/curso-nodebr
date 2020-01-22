// Deprecated commands for vision and inert 
npm i vision inert hapi-swagger 

// Commands that run and installed the dependencies 
npm i @hapi/vision @hapi/inert hapi-swagger 

// Commands that run and installed the dependencies at the compatible version 
npm i @hapi/vision@5.0.0 @hapi/inert@5.2.0 hapi-swagger 

const swaggerOptions = {
    info: {
        title: 'HapiSwagger', 
        version: 'v1.0'
    }, 
    lang: 'pt'
}

await app.register([
    Vision,
    Inert, 
    {
        plugin: HapiSwagger, 
        options: swaggerOptions 
    }
])

Go to the API route and insert the key-value pair tags: ['api'] in order to have it accessible on the documentation 
