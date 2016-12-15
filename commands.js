'use strict';

const cma = require( 'contentful-management' );
const space = cma.createClient( {
  accessToken: process.env.CF_CMA_TOKEN
} ).getSpace( process.env.CF_SPACE_ID );


/**
 * Mapper object including all 
 * available commands
 * 
 * Simply add more if you need more
 */
const commands = {
  /**
   * Retrieve all posts by CMA
   */
  'all-posts' : {
    help  : 'See all posts (published and unpublished)',
    fn    : () => {
      return getFormattedListResponse( 'All posts (published and drafts):');
    }
  },
  
  /**
   * Retrieve all draft posts from the CMA
   */
  'all-drafts' : {
    help : 'See all pending drafts',
    fn   : () => {
      return getFormattedListResponse(
        'All current drafts',
        {
          'sys.publishedAt[exists]' : false
        }
      );
    }
  },
  
  /**
   * Create a new post and set it's title
   */
  'create-post' : {
    help    : 'Create a new post',
    example : '"How easy it is to build a slack bot"',
    fn      : ( text ) => {
      
      const title = text.replace( /"/g, '' );
      
      return space.then( space => {
        return space.createEntry(
          process.env.CF_POST_CONTENT_TYPE_ID,
          {
            fields : {
              title : {
                [ process.env.CF_LANGUAGE ] : title
              }
            }
          }
        );
      } )
      .then( () => {
        return {
          text : `🎉 "${title}" created.`
        };
      });
    }
  },
  
  /**
   * Help command
   */
  help : {
    fn : () => {
      return new Promise( (resolve, reject ) => {
        resolve( 
          {
            text        : 'The current commands are available:',
            attachments : Object.keys( commands )
              .filter( command => command !== 'help' )
              .map( command => ( {
                color   : '#6ebad3',
                title   : command,
                text    : `${commands[ command ].help}\n ${commands[command].example ? `/contentful ${command} ${commands[command].example}` : ''}`
              } ) )
          }
        );
      });
    }  
  }
};


/**
 * Fetch entries and format 
 * them to be send back to slack
 */
function getFormattedListResponse( headline, query = {} ) {
  return space
    .then( space => {
      return space.getEntries( Object.assign( {
        content_type : process.env.CF_POST_CONTENT_TYPE_ID,
        order        : '-sys.createdAt'
      }, query ) );
    } )
    .then( entries => {
      return {
        text        : headline,
        attachments : entries.items.map( post => {
          return {
            color      : `${!! post.sys.publishedAt ? '#8ada55' : '#f6e8b0'}`,
            title      : `${!! post.sys.publishedAt ? '⛴' : '🎨'} ${post.fields.title[ process.env.CF_LANGUAGE ]} (${!! post.sys.publishedAt ? 'published' : 'draft'})`,
            title_link : `https://app.contentful.com/spaces/${process.env.CF_SPACE_ID}/entries/${post.sys.id}`
          };
        } )
      };    
    } );
}

module.exports = commands;