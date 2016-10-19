/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 06.10.16
 * Time: 17:08
 */



'use strict';



chrome.runtime.sendMessage({type: 'getStyles', host: window.location.hostname}, (data) => {

    if(document.getElementById('inject-styles') != null) {
        return;
    }

    if(data != null) {
        for(let key in data) {
            if(data.hasOwnProperty(key)) {
                let item = data[key];

                if(item.freeze == true) {
                    continue;
                }

                // todo regexp
                if(false) {
                    continue;
                }

                if(item.styles) {
                    Styles.inject(item.styles);
                    break;
                }
            }
        }
    }
});