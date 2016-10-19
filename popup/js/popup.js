/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 11.10.16
 * Time: 14:15
 */



'use strict';



(() => {


    let hostDOM = document.querySelector('.js-host');
    let labelDOM = document.querySelector('.js-label');
    let indicatorDOM = document.querySelector('.js-indicator');

    Utils.getHostForSelectedTab((host) => {
        labelDOM.innerHTML = 'Used';
        indicatorDOM.className += ' is-used'; // is-animated
        hostDOM.innerHTML = host;
    })



})();



