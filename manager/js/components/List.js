/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 07.10.16
 * Time: 14:24
 */



'use strict';



class List {


    /**
     *
     */
    constructor(options) {
        this.items = {};
        this.root = null;
        this.emptyMessageDOM = null;

        // Init root
        let {root} = options;
        if(root) {
            this.root = root;
        }
    }


    /**
     *
     * @param id
     * @param data
     * @returns {List}
     */
    addItem(id, data) {
        if(id && typeof data === 'object') {
            this.items[id] = data;
        }

        return this;
    }


    /**
     *
     * @param id
     * @returns {List}
     */
    removeItem(id) {
        if(this.checkValidId(id)) {
            delete this.items[id];
        }

        return this;
    }


    /**
     *
     * @param id
     * @param data
     * @returns {List}
     */
    updateItem(id, data) {
        if(this.checkValidId(id)) {
            let item = this.items[id];
            let {name, host} = data;
            item.name = name;
            item.host = host;
        }

        return this;
    }


    /**
     *
     * @param id
     * @returns {List}
     */
    updateSingleInDOM(id) {
        let target = this.root.querySelector(`[data-id="${id}"]`);
        if(target && this.checkValidId(id)) {
            let data = this.items[id];
            let {name, host} = data;

            let nameDOM = target.querySelector('.js-name');
            if(nameDOM) {
                nameDOM.innerHTML = name;
            }
            let hostDOM = target.querySelector('.js-host');
            if(hostDOM) {
                hostDOM.innerHTML = host;
            }
        }

        return this;
    }


    /**
     *
     * @param id
     * @returns {*}
     */
    removeSingleInDOM(id) {
        if(this.isNullRoot('Can not remove single! Root is null!')) {
            return false;
        }

        let target = this.root.querySelector(`[data-id="${id}"]`);
        if(target) {
            target.parentNode.removeChild(target);
        }

        if(Object.keys(this.items).length === 0) {
            this.renderEmptyMessage();
        }

        return this;
    }


    /**
     *
     */
    removeEmptyMessageInDOM() {
        if(this.emptyMessageDOM != null) {
            this.emptyMessageDOM.parentNode.removeChild(this.emptyMessageDOM);
            this.emptyMessageDOM = null;
        }
    }


    /**
     *
     * @param id
     * @returns {*}
     */
    renderItemInDOM(id) {
        if(this.isNullRoot('Can not render! Root is null!')) {
            return false;
        }

        let {name, host, freeze} = this.items[id];

        let itemDOM = document.createElement('div');
        itemDOM.className = 'b-style-item util-section js-item';
        itemDOM.setAttribute('data-id', id);
        itemDOM.setAttribute('data-name', name);
        itemDOM.setAttribute('data-host', host);
        itemDOM.innerHTML = `
            <div class="style-item__name js-name">${name}</div>
            <div class="style-item__ste js-host">${host}</div>
            <div class="container-item-controls">
                <a class="b-action is-update js-update" href="#">Update</a>
                <a class="b-action is-freeze js-freeze ${freeze ? 'is-active' : ''}" href="#">${!freeze ? 'Freeze' : 'Frozen'}</a>
                <a class="b-action is-delete js-delete" href="#">Delete</a>
            </div>`;


        this.root.appendChild(itemDOM);

        if(Object.keys(this.items).length > 0) {
            this.removeEmptyMessageInDOM();
        }

        return this;
    }


    /**
     *
     * @returns {List}
     */
    renderAllItemsInDOM() {
        let items = this.items;
        for(let key in items) {
            if(items.hasOwnProperty(key)) {
                this.renderItemInDOM(key);
            }
        }

        return this;
    }


    /**
     *
     * @returns {*}
     */
    renderEmptyMessage() {
        if(this.isNullRoot('Can not render! Root is null!')) {
            return false;
        }

        this.emptyMessageDOM = document.createElement('div');
        this.emptyMessageDOM.className = 'util-section is-small';
        this.emptyMessageDOM.innerHTML = 'You have not added styles';

        this.root.appendChild(this.emptyMessageDOM);

        return this;
    }


    /**
     *
     * @param id
     * @returns {boolean}
     */
    checkValidId(id) {
        if(id != null && id in this.items) {
            return true;
        }
    }


    /**
     *
     * @param message
     * @returns {boolean}
     */
    isNullRoot(message) {
        if(this.root == null) {
            console.error(message);
            return true;
        }
        return false;
    }


}


