# node-memdb
<br>
var db = require('memdb');<br>
<br>
console.log('db', db);<br>
<br>
db.define('tab1', {name:'hello', label:0,   link:'tab2' });<br>
db.define('tab2', {name:'hello', label:100, link:'' });<br>
<br>
var tab1 = db.table('tab1');<br>
tab1.insert({name:'t1r1'});<br>
tab1.insert({name:'t1r2'});<br>
tab1.insert({name:'t1r3'});<br>
<br>
var tab2 = db.table('tab2');<br>
tab2.insert({name:'t2r'});<br>
tab2.insert({name:'t2r', link: tab1.read(2)});<br>
tab2.insert({name:'t2r', label:300});<br>
<br>
<br>
console.log('tab1', tab2);<br>
console.log('tab2', tab2);<br>
<br>
console.log('tab2 findAll', tab2.findAll());<br>
console.log('tab2 findOne', tab2.findOne('name', 't2r'));<br>
console.log('tab2 find',    tab2.find('label', 100));<br>
