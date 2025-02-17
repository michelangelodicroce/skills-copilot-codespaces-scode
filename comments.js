//create a web server
//create a web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = require('./comments');

//create a web server
http.createServer((req, res) => {
    //parse the request
    const parsedUrl = url.parse(req.url, true);
    //get the path name
    let pathname = `.${parsedUrl.pathname}`;
    //get the method
    const method = req.method;
    //get the id from the query string
    const id = parsedUrl.query.id;

    //if the path name is /comments
    if (pathname === './comments') {
        //if the method is GET
        if (method === 'GET') {
            //send the comments
            res.end(JSON.stringify(comments));
        }
        //if the method is POST
        else if (method === 'POST') {
            //create a variable to store the data
            let body = '';
            //set the request encoding to utf-8
            req.setEncoding('utf-8');
            //listen for the data event
            req.on('data', (chunk) => {
                                //add the chunk to the body
                                body += chunk;
                            });
                
                            //listen for the end event
                            req.on('end', () => {
                                //parse the body as JSON
                                const newComment = JSON.parse(body);
                                //add the new comment to the comments array
                                comments.push(newComment);
                                //send the new comment
                                res.end(JSON.stringify(newComment));
                            });
                        }
                    }
                });