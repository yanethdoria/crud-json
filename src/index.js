const app = require ('./app'); 

async function main () {
     await app.listen(app.get('port'));
     console.log('Sever on port', app.get('port'));
}

main();