var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let currentConnections = 0;
const maxConnections = 1000;

doAjaxThings();

async function doAjaxThings() {
    console.log("Current: " + currentConnections);

    currentConnections++;

    if (currentConnections > maxConnections) {
        setTimeout(() => {
            doAjaxThings(currentConnections, maxConnections);
        }, getRandomInt(10, 100))
    } else {
        setTimeout(function () {
            doAjaxThings(currentConnections, maxConnections);

            makeRequest("GET", "http://localhost:8080")
                .then((res) => {
                    currentConnections--;
                    console.log("RESPONSE" + res);
                })
                .catch((err) => {
                    console.log("ERROR" + err);
                });
        }, getRandomInt(10, 100));
    }
}

function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
