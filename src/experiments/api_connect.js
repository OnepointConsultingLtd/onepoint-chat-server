

fetch("http://127.0.0.1:9999/protected/project/context?project=onepoint&question=What%20are%20the%20main%20topics%3F", {
    headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaWxmIiwibmFtZSI6ImdpbGYiLCJpYXQiOjE3NDIzMTczMzEsImVtYWlsIjoiZ2lsLmZlcm5hbmRlc0BvbmVwb2ludGx0ZC5jb20ifQ.tyai4IX3-eSZ16nTLrw8Wh76HizBD9aDiDyunpdEi6LGBpBMJTlCl4GNWTGmlnfRFwhD6lzR4TeqI4KfDetkbA`
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));



