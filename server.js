'use strict';

const slack    = require( 'tinyspeck' );
const port     = 3000;
const commands = require( './commands' );

if ( ! process.env.SLACK_TOKEN ) {
  throw new Error(
    'Please define environment variable SLACK_TOKEN'
  );
}

slack.on( '/contentful', ( { response_url, user_id, text } ) => {
  if ( ! text.length ) {
    return sendErrorResponse( 
      response_url,
      user_id,
      'Please specify a command. Execute `/contentful help` to see what\'s available'
    );
  }
  
  const parsedResult = text.match( /^([a-zA-Z\-].*?)(\s(.*))?$/ );
  const command  = parsedResult[ 1 ];
  const argsText = parsedResult[ 3 ];

  if ( ! command || ! commands[ command ] ) {
    return sendErrorResponse( 
      response_url,
      user_id,
      'Command not found. Execute `/contentful help` to see what\'s available'
    );
  }

  return commands[ command ].fn( argsText ).then( ( { text, attachments } ) => {
    return slack.send( response_url, { channel: user_id, text: text, attachments } );
  } )
  .then( res => {
    console.log( 'Successfuly answered the command' );
  } )
  .catch( console.log );   
} );


function sendErrorResponse( response_url, user_id, msg ) {
  return slack.send(
    response_url,
    { 
      channel : user_id,
      text    : msg
    }
  ); 
}


console.log( `Starting server at ${port}` );
slack.listen( port, process.env.SLACK_TOKEN );