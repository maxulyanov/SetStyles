/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 06.10.16
 * Time: 17:08
 */



'use strict';



chrome.runtime.sendMessage({type: 'getStyles', hostname: window.location.hostname}, (styles) => {
    if(styles) {
        Styles.inject(styles);
    }
});