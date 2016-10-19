/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 11.10.16
 * Time: 13:50
 */



'use strict';



class Editor {


    /**
     *
     * @param selectorID
     */
    constructor(selectorID) {
        this.editor = ace.edit(selectorID);
        this.initSettings = false;
    }


    /**
     *
     */
    setSettings() {
        if(this.initSettings) {
            return;
        }

        let session = this.getSession();
        this.editor.setTheme('ace/theme/dawn');
        var Mode = require('ace/mode/css').Mode;
        session.setMode(new Mode());
        session.setUseWrapMode(true);
        this.initSettings = true;
    }


    /**
     *
     * @returns {*}
     */
    getSession() {
        return this.editor.getSession();
    }



}