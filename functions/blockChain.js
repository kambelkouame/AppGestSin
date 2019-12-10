var fetch =require('node-fetch');

exports.list = ()=>{
	fetch('http://localhost:5001/chain')
    .then(res => res.json())
    .then(body => {return body});
}

   