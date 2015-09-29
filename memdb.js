"use strict";

class MemDB {
	constructor() {
        var db = this;
    
        //this.Column = class {
        //    constructor(default) {
        //        this.default = default;
        //    }
        //}
        
        this.Model = class {
            constructor(columns) {
                this.id = 0; //new db.Column(0);
                for (var key in columns) {
                    this[key] = columns[key]; //new db.Column(cfg[key]);
                }
            }
        }
        
        this.Table = class {
            // Constructor
            constructor(model) {
                this.model  = (typeof model === 'Model') ? model : new db.Model(model);
                this.data   = new Array();
            }
            
            // Find
            find(name, value){
                var result = [];
                for (var key in this.data) {
                    var record = this.data[key];
                    if (record.hasOwnProperty(name) && record[name] === value) {
                    	result.push(record);
                    }    
                }
                return result;
            }
            
            // Find One
            findOne(name, value){
                for (var key in this.data) {
                    var record = this.data[key];
                    if (record.hasOwnProperty(name) && record[name] === value) {
                    	return record;
                    }    
                }
                return undefined;
            }
            
            // Find All
            findAll(){
                return this.data;
            }
            
            
            // Insert
            read(idx){
                return this.data[idx];
            }
            
            insert(rec){
                rec.id = this.data.length;
                
                // Default record
                var tmprec = {}
                for (var key in this.model) {
                    tmprec[key] = this.model[key]; //.default;
                }
                
                // Value record
                for (var key in rec) {
                	if (tmprec.hasOwnProperty(key)) {
                    	tmprec[key] = rec[key];
                    }
                }
                
                this.data.push(tmprec);
                return tmprec.id;
            }
            
            update(idx, rec){
                rec.id = idx;
                var oldrecord = this.data[idx];
                if (typeof oldrecord !== 'undefined') {
                    for (var key in this.model) {
                        if (rec.hasOwnProperty(key)) {
                            oldrecord[idx][key] = rec[key];
                        }
                    }
                    return true;
                } else return false;
            }
            
            delete(idx){
                delete this.data[idx];
            }
            
        }
        
        this.tables = {};
	} 
    
    define(name, schema) {
       return this.tables[name] = new this.Table(schema);
    }
    
    table(name){
    	return this.tables[name];
    }
    
    delete(name){
    	delete this.tables[name];
    }
}

module.exports = new MemDB();
