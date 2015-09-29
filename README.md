# node-memdb

var db = require('memdb');

console.log('db', db);

db.define('tab1', {name:'hello', label:0,   link:'tab2' });
db.define('tab2', {name:'hello', label:100, link:'' });

var tab1 = db.table('tab1');
tab1.insert({name:'t1r1'});
tab1.insert({name:'t1r2'});
tab1.insert({name:'t1r3'});

var tab2 = db.table('tab2');
tab2.insert({name:'t2r'});
tab2.insert({name:'t2r', link: tab1.read(2)});
tab2.insert({name:'t2r', label:300});


console.log('tab1', tab2);
console.log('tab2', tab2);
    
console.log('tab2 findAll', tab2.findAll());
console.log('tab2 findOne', tab2.findOne('name', 't2r'));
console.log('tab2 find',    tab2.find('label', 100));
