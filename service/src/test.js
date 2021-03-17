var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function doAjaxThings() {
    for (let i = 0; i < 1000000; i++) {
        setTimeout(function () {
            makeRequest("GET", "http://localhost:8080")
                .then(
                    (res) => {
                        console.log(i + "__" + res);
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);
                    }
                );
        }, i * (Math.random() * 100));
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

doAjaxThings();
