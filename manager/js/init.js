/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 07.10.16
 * Time: 14:48
 */



'use strict';



(() => {




    // CREATE INSTANCE
    const editorCreate = new Editor('editor-create');
    const editorUpdate = new Editor('editor-update');
    const list = new List({
        root: document.querySelector('.js-list-root')
    });
    Storage.createStructure();




    // RENDER LIST
    Storage.getAllItems((object) => {
        if(Object.keys(object).length > 0) {
            for(let key in object) {
                if(object.hasOwnProperty(key)) {
                    let {name, host, freeze} = object[key];
                    list.addItem(key, {
                        name,
                        host,
                        freeze
                    })
                }
            }
            list.renderAllItemsInDOM();
        }
        else {
            list.renderEmptyMessage();
        }
    });




    // CREATE EVENT
    $('.js-form-create').on('submit', function(event) {
        event.preventDefault();

        let data = prepareDataForStorage($(this), editorCreate);

        // Add storage
        Storage.createItem(data.host, data, (id) => {
            console.info(`Create success - id:${id}`);

            // Add list
            list.addItem(id, data).renderItemInDOM(id);

            // Reset Value
            resetFieldForm($(this), editorCreate);

            // Close popup
            $(this).find('.js-remodal-close').click();

        });
    });




    // UPDATE EVENT
    const $formUpdate = $('.js-form-update');
    $(document).on('click', '.js-update', function (event) {
        event.preventDefault();

        let {host, id} = getDataItem($(this));

        // Get data
        Storage.getById(host, id, (data) => {
            if(data != null) {
                let {name, url, styles} = data;

                $formUpdate.find('[name="name"]').val(name);
                $formUpdate.find('[name="url"]').val(url);
                editorUpdate.getSession().setValue(CSSJSON.toCSS(styles));

                window.idUpdatedElement = id;
                window.location.hash='update';
            }
            else {
                alert('Error! Data not found in Storage!')
            }
        });

    });

    $formUpdate.on('submit', function(event) {
        event.preventDefault();

        if(idUpdatedElement == null) {
            return;
        }

        let data = prepareDataForStorage($(this), editorUpdate);

        // Update storage
        Storage.updateById(data.host, idUpdatedElement, data, () => {
            console.info(`Update success - id:${idUpdatedElement}`);

            // Update list
            list.updateItem(idUpdatedElement, data).updateSingleInDOM(idUpdatedElement);

            // Close popup
            $(this).find('.js-remodal-close').click();

        });
    });




    // FREEZE EVENT
    $(document).on('click', '.js-freeze', function (event) {
        event.preventDefault();

        let {host, id} = getDataItem($(this));

        Storage.getById(host, id, (data) => {
            data.freeze = !data.freeze;
            Storage.updateById(host, id, data);
            $(this).toggleClass('is-active');
            $(this).text($(this).text() === 'Freeze' ? 'Frozen' : 'Freeze');
        });

    });




    // DELETE EVENT
    $(document).on('click', '.js-delete', function (event) {
        event.preventDefault();

        let {id, host, name} = getDataItem($(this));
        let resultConfirm = confirm(`You really want to delete ${name}?`);

        if (resultConfirm) {
            if (id == null) {
                console.error('Ops id not found!');
                return false;
            }

            list.removeItem(id);
            list.removeSingleInDOM(id);
            Storage.deleteById(host, id);
        }

    });




    // POPUP EVENTS
    $(document).on('opening', '.js-popup-create', function () {
        editorCreate.setSettings();

    });

    $(document).on('opening', '.js-popup-update', function () {
        editorUpdate.setSettings();
    });

    $(document).on('closed', '.js-popup-update', function () {
        window.idUpdatedElement = null;
    });




    // SUPPORT FUNC


    /**
     *
     * @param element
     * @returns {{host: *, id: *, name: *}}
     */
    function getDataItem(element) {
        let $item = element.closest('.js-item');
        let id = $item.data('id');
        let host = $item.data('host');
        let name = $item.data('name');

        return {host, id, name};
    }


    /**
     *
     * @param form
     * @param editor
     * @returns {{}}
     */
    function prepareDataForStorage(form, editor) {
        let data = Utils.createObjectParams(form.serializeArray());
        data.host = Utils.getHost(data.url);
        data.styles =  CSSJSON.toJSON(editor.getSession().getValue(), true);
        data.freeze = false;
        return data;
    }


    /**
     *
     * @param form
     * @param editor
     */
    function resetFieldForm(form, editor) {
        form.find('.js-field-form').val('');
        editor.getSession().setValue('');

    }


})();



