/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 07.10.16
 * Time: 14:24
 */



'use strict';


class Utils {


    /**
     *
     * @param eventName
     * @param detail
     * @returns {CustomEvent}
     */
    static factoryCustomEvents(eventName, detail = {}) {
        return new CustomEvent(eventName, {
            bubbles: true,
            detail: detail
        });
    }


    /**
     *
     * @param target
     * @param objects
     * @returns {*}
     */
    static extend(target, objects) {

        for (var object in objects) {
            if (objects.hasOwnProperty(object)) {
                recursiveMerge(target, objects[object]);
            }
        }

        function recursiveMerge(target, object) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    var current = object[property];
                    if (Utils.getConstructor(current) === 'Object') {
                        if (!target[property]) {
                            target[property] = {};
                        }
                        recursiveMerge(target[property], current);
                    }
                    else {
                        target[property] = current;
                    }
                }
            }
        }

        return target;
    }


    /**
     *
     * @param object
     * @returns {string}
     */
    static getConstructor(object) {
        return Object.prototype.toString.call(object).slice(8, -1);
    }



    /**
     *
     * @param callback
     */
    static getHostForSelectedTab(callback) {
        let domain = null;
        chrome.tabs.getSelected(null, function (tab) {
            let url = new URL(tab.url)
            domain = url.hostname;
            callback(domain);
        });
    }


    /**
     *
     * @param url
     * @returns {*}
     */
    static getHost(url) {
        if(typeof url === 'string') {
            let results = url.match(/^(?:https?:\/\/)?(?:www\.)?((?:(?!www\.|\.).)+\.[a-zA-Z0-9.]+)/i);
            return results[1];
        }
    }


    /**
     *
     * @param array
     * @returns {{}}
     */
    static createObjectParams(array) {
        let result = {};
        if(Array.isArray(array) && array.length > 0) {
            array.forEach((item) => {
                result[item.name] = item.value;
            });
        }
        return result;
    }


}
