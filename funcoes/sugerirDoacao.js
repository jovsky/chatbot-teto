
const lexResponse = require('../lex/responses');

const LINK_35 = "https://pag.ae/7WqUG7HsM"
const LINK_50 = "https://pag.ae/7WqUGspB7"
const LINK_100 = "https://pag.ae/7WqUGHr61"
const LINK_OUTROS = "https://pag.ae/7WqUsNdNN"
const LINK_EMPRESA = "https://amigos.teto.org.br/parcerias-corporativas"
const LINK_MAIS = "https://hiringcoders14.myvtex.com/teto"

async function dispatch(intentRequest, callback) {

  const slots = intentRequest.currentIntent.slots;


  if (slots.doar !== null && slots.doar !== "sim" && slots.doar !== "nao" ) {
    //nao entendi
    const message = {
      contentType: 'PlainText',
      content: "Não entendi..."
    }
    lexResponse.elicitSlot(intentRequest.sessionAttributes, 'sugerirDoacao', slots, 'doar', message, undefined, callback);
  }

  else if (slots.doar === "nao") {
    
    const message = {
      contentType: 'PlainText',
      content: "Poxa, que pena :( Mas agradecemos a sua visita. Se mudar de ideia, não hesite em doar para a TETO!"
    }

    lexResponse.close(intentRequest.sessionAttributes, 'Failed', message, undefined, callback);

  }
  else if (slots.doar === "sim") {

    const object_kommunicate = `\{"message": "Faça sua escolha",\n "platform":"kommunicate",\n "metadata": \{"contentType":"300",\n "templateId":3,\n "payload":[\{"type":"link",\n "url":"${LINK_35}",\n "name":"Doe R$ 35,00"\},\{"type":"link",\n "url":"${LINK_50}",\n "name":"Doe R$ 50,00"\},\{"type":"link",\n "url":"${LINK_100}",\n "name":"Doe R$ 100,00"\},\{"type":"link",\n "url":"${LINK_OUTROS}",\n "name":"Outro valor"\},\{"type":"link",\n "url":"${LINK_EMPRESA}",\n "name":"Doar como empresa"\}]\}\}`

    const message = {
      contentType: 'CustomPayload',
      content: object_kommunicate
    }

    lexResponse.close(intentRequest.sessionAttributes, 'Fulfilled', message, undefined, callback);
    return;
  }
  lexResponse.delegate(intentRequest.sessionAttributes, slots, callback);
  return;

}
 
module.exports = async (event, context, callback) => {
  try {

    await dispatch(event, (response) => callback(null, response));

  } catch (err) {

    callback(err);

  }
};
