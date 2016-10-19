/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 06.10.16
 * Time: 18:38
 */



'use strict';



class Styles {


    constructor() {}



    /**
     *
     * @param jsonCss
     */
    static inject(jsonCss) {

        if (!jsonCss) {
            console.error('css is empty!');
        }

        let css = CSSJSON.toCSS(jsonCss);

        let head = document.head || document.getElementsByTagName('head')[0];
        let style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('id', 'inject-styles');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }

}