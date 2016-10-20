/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 06.10.16
 * Time: 17:08
 */



'use strict';


chrome.runtime.sendMessage({type: 'getStyles', host: window.location.hostname}, (data) => {


    if (document.getElementById('inject-styles') != null) {
        return;
    }

    if (data != null) {
        let href = window.location.href;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let item = data[key];

                if (item.freeze == true) {
                    continue;
                }

                //
                if (href.indexOf(item.url) == -1) {
                    continue;
                }

                if (item.styles) {
                    console.log('inject!');
                    Styles.inject(item.styles);
                    break;
                }
            }
        }
    }
});

