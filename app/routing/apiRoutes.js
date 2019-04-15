var friends = require("../data/friends.json");
const fs = require('fs');

function findTheIndexOfSmallest(arr) {
    var index = 0;
    var smallest = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < smallest ) {
            smallest  = arr[i]
            index = i;
        }
    }
    return arr.indexOf(smallest);
}

function findMatch(data, userData){
    var result = [];
    for(let i=0; i<data.length; i++){
        var sum = 0;
        for (let j=0; j<data[i].scores.length; j++){
            var diff = Math.abs(data[i].scores[j] - userData.scores[j])
            sum += diff 
        }
        result.push(sum);
    }
    var matchIndex = findTheIndexOfSmallest(result);
    return data[matchIndex];
}



module.exports = function (app){

    app.get("/api/friends", function(req,res){
        res.json(friends);
    }); 

    app.post("/api/survey", function(req,res){
        var newRecord = {
            name: req.body.name,
            img: req.body.photo,
            scores: req.body['scores[]'].map(elem => parseInt(elem))
        }
        var match = findMatch(friends, newRecord)
        friends.push(newRecord)
        fs.writeFile('./app/data/friends.json', JSON.stringify(friends) , function (err) {
            if (err) throw err;
            res.json(match);
          });
    }); 
}