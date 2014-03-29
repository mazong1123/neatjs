(function () {
    neat = {
        /**
         * Create a random Guid.
         * 
         * @return {String} a random guid value.
         * 
         * @version 1.0
         */
        newGuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x'
                                ? r
                                : (r & 0x3 | 0x8);
                        return v.toString(16);
                    }).toUpperCase();
        },

        /**
         * Convert color hex value to RGB value. 
         * 
         * @param {String} value - a hex value
         * @return {String} a rgb value.
         * 
         * @version 1.0
         */
        hexToRgb: function (value) {
            if (value.indexOf('#') != -1) {
                value = value.substr(1);
            }
            var R = value.substr(0, 2);
            var G = value.substr(2, 2);
            var B = value.substr(4, 2);

            return 'rgb(' + parseInt(R, 16) + ',' + parseInt(G, 16) + ','
                    + parseInt(B, 16) + ')';
        },

        /**
         * Retrieve query parameter value of an url.
         * 
         * @param {String} name - the name of the query parameter to retrieve.
         * @param {String} url - url to extract the query parameter.
         * @return {String} the value of the specific query parameter.
         * 
         * @version 1.0
         */
        getUrlParameterByName: function (name, url) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            if (results == null) {
                return "";
            }
            else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        },

        /**
        * Determine if two arrays equal.
        * 
        * @param {Array} arr1 - First array to compare.
        * @param {Array} arr2 - Second array to compare.
        * @return {Boolean} - true if two arrays equal. Otherwise false.
        * 
        * @version 1.0
        */
        isArrayEqual: function (arr1, arr2) {
            if ($(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0) {
                return true;
            }

            return false;
        },

        /**
         * Clone an Object.
         * 
         * @param {Object} object - an object to clone.
         * @return {Object} a cloned object.
         *
         * @version 1.0
         */
        cloneObject: function (object) {
            return $.extend(true, {}, object);
        },

        /**
         * Clone an Array.
         * 
         * @param {Array} array - an array to clone.
         * @return {Array} a cloned array.
         *
         * @version 1.0
         */
        cloneArray: function (array) {
            var cloneArray = new Array();
            for (var i = 0; i < array.length; i++) {
                var obj = array[i];
                cloneArray.push(obj);
            }

            return cloneArray;
        },

        /**
        * Set specific item to the browser storage. If localStorage is availiable, the value will be
        * stored to it. Otherwise, store the value to cookie.
        * 
        * @param {String} key - the key for the item to store.
        * @param {String} value - the value of the item to store.
        *
        * @version 1.0
        */
        setItemToStorage: function (key, value) {
            key = 'custom_' + key;
            if (HeapUtility.localStorageSupported()) {
                localStorage.setItem(key, value);
            }
            else {
                HeapUtility.setCookie(key, value, 3600);
            }
        },

        /**
        * Get specific item to the browser storage. If localStorage is availiable, get the item from localstorage.
        * Otherwise try to get the value from cookie.
        * 
        * @param {String} key - the key of the item.
        * @return {String} the value of the item.
        *
        * @version 1.0
        */
        getItemFromStorage: function (key) {
            var value = undefined;
            key = 'custom_' + key;

            if (HeapUtility.localStorageSupported()) {
                // If localStorage supported, get the item from it.
                value = localStorage.getItem(key);
            }

            if (value == undefined) {
                // If localStorage is not supported or empty value found in the localStorage, try to get the
                // value from cookie.
                value = HeapUtility.getCookie(key);
            }

            return value;
        },

        /**
        * Remove specific item from the browser storage. 
        * 
        * @param {String} key - the key for the item.
        *
        * @version 1.0
        */
        removeItemFromStorage: function (key) {
            key = 'custom_' + key;

            if (HeapUtility.localStorageSupported()) {
                // If localStorage supported.
                localStorage.removeItem(key);

                return;
            }

            HeapUtility.delCookie(key);
        },

        /**
        * Set specific item to the browser cookie.
        * 
        * @param {String} c_name - the key for the item to store.
        * @param {String} value - the value of the item to store.
        * @param {String} exdays - the expire days of the item.
        *
        * @version 1.0
        */
        setCookie: function (c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
            document.cookie = c_name + "=" + c_value;
        },

        /**
        * Get specific item from the browser cookie.
        * 
        * @param {String} c_name - the key of the item.
        * @return {String} the value of the item.
        *
        * @version 1.0
        */
        getCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;

                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }

            return undefined;
        },

        /**
        * Determine if localStorage is supported by current browser.
        *
        * @return {Boolearn} true - localStorage is supported. false - localStorage is not supported.
        *
        * @version 1.0
        */
        localStorageSupported: function () {
            try {
                localStorage.setItem("test", "test");
                localStorage.removeItem("test");
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },

        /**
        * Clear cookies of current browser.
        *
        * @version 1.0
        */
        clearCookies: function () {
            var strCookie = document.cookie;

            // Split cookies.
            var arrCookie = strCookie.split(";");

            // Process every key pair.
            var arr = null;
            for (var i = 0; i < arrCookie.length; i++) {
                arr = arrCookie[i].split("=");
                if (arr.length > 0)
                    HeapUtility.delCookie(arr[0]);
            }
        },

        /**
        * Remove specific item in the cookies.
        * 
        * @param {String} c_name - the key of the item to remove.
        *
        * @version 1.0
        */
        delCookie: function (c_name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = HeapUtility.getCookie(c_name);
            document.cookie = c_name + "=" + cval + "; expires=" + exp.toGMTString();
        }
    };
})();