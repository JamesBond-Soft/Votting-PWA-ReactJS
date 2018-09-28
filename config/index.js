/**
 * Created by OliveTech on 10/26/2017.
 */

var config;
var DB_HOST, DB_USER, DB_PASS, DB_NAME
    DB_HOST = "localhost"
    DB_USER = "root"
    DB_PASS = "123456"
    DB_NAME = "votingdb"

var app_secret_key = "7d3d3b6c2d3683bf25bbb51533ec6dab"

var port = 8442
var duration_time = 86400 //60 * 60 * 24

config = {
    db_host : DB_HOST,
    db_user : DB_USER,
    db_pass : DB_PASS,
    db_name : DB_NAME,
    secret : app_secret_key,
    server_url : "",
    server_image_path : "",
    server_media_path : "",
    pongInterval : 25000,
    message_duration_time : duration_time,
    serverPort : port,
    debugging_mode : true,
    
};

module.exports = config;