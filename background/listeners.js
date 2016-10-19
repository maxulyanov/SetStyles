/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 06.10.16
 * Time: 18:27
 */

'use strict';

chrome.runtime.onMessage.addListener((request, sender, response) => {

    let type = request.type;
    if(!type) {
        response(null);
        return;
    }

    let host = request.host;
    switch (type) {
        case 'getStyles':
            Storage.getByHost(host, (data) => {
                console.log(host);
                response(data);
            });
            return true;
            break;
        default:
            console.warn(`type ${type} not supported!`);
    }

});