/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';



class Storage {


    /**
     *
     * @returns {number}
     */
    static generateId() {
        return Number(new Date());
    }


    /**
     *
     */
    static createStructure() {
        StorageDriver.get('sites', (data) => {
            if (data == null) {
                StorageDriver.set('sites', {});
            }
        });
    }


    /**
     *
     * @param host
     * @param callback
     */
    static getItemsForHost(host, callback) {
        StorageDriver.get('sites', (data) => {
            if (host in data) {
                callback(data[host]);
            }
            else {
                callback({});
            }

        });
    }


    /**
     *
     * @param callback
     */
    static getAllItems(callback) {
        StorageDriver.get('sites', (data) => {
            let objects = {};
            if(data && Object.keys(data).length > 0) {
                for(let key in data) {
                    if(data.hasOwnProperty(key)) {
                        let host = data[key];
                        if(host && Object.keys(host).length > 0) {
                            for(let id in host) {
                                if(host.hasOwnProperty(id)) {
                                    objects[id] = host[id];
                                }
                            }
                        }
                    }
                }
            }

            callback(objects);

        });

    }


    /**
     *
     * @param host
     * @param object
     * @param callback
     */
    static createItem(host, object, callback) {
        StorageDriver.get('sites', (data) => {
            let id = Storage.generateId();
            if(!data[host]) {
                data[host] = {};
            }

            data[host][id] = object;
            StorageDriver.set('sites', data);
            callback(id);
        })
    }


    /**
     *
     * @param host
     * @param id
     */
    static deleteById(host, id) {
        StorageDriver.get('sites', (data) => {
            if(!host in data || !id in data[host]) {
                return;
            }
            delete data[host][id];

            if(Object.keys(data[host]).length === 0) {
                delete data[host];
            }

            StorageDriver.set('sites', data);
        })
    }


    /**
     *
     * @param host
     * @param id
     * @param object
     * @param callback
     */
    static updateById(host, id, object, callback) {
        StorageDriver.get('sites', (data) => {
            if(host in data && id in data[host]) {
                data[host][id] = object;
                StorageDriver.set('sites', data);
            }
            if(typeof callback === 'function') {
                callback();
            }
        })
    }


    /**
     *
     * @param id
     * @param callback
     */
    static getById(host, id, callback) {
        StorageDriver.get('sites', (data) => {
            if(!(host in data) || !(id in data[host])) {
                callback(null);
            }
            callback(data[host][id]);
        })
    }


}
