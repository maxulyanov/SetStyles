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

    switch (type) {
        case 'getStyles':
            StorageDriver.get('styles', (styles) => {
                response(styles);
            });
            return true;
            break;
    }

});