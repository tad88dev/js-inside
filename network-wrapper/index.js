'use strick';

/**
 * Network wrapper object
 * @author Dung Tran
 * @module Network Module
 * @verion 0.0.1
 */
(function (w) {

    /* Is jQuery defined */
    if (typeof (w.$) === 'undefined') {
        throw { error: 1, message: 'jQuery was not defined' };
    }

    /**
     * Network internal object
     * @private
     */
    var _network = {
        /**
         * Data stack
         * @private
         */
        _stack: [],
        /**
         * Settings
         * @private
         */
        _settings: {},
        /**
         * Callback function
         * @private
         */
        _received: null
    };

    /**
     * Setup network
     * @param settings
     */
    _network.setup = function (settings) {
        var temp = {};
        var index = '';
        for(index in settings){
            temp[index] = settings[index]; //we are going to fork object bypass javascript memory issue 
        }
        this._settings = temp;
    }

    /**
     * Push data to stack
     * @param object data
     * @return integer size of stack 
     */
    _network.push = function (data) {
        return this._stack.push(data);
    };

    /**
     * Pop last item from stack
     * @return object|undefined return last object from stack, otherwise return 
     */
    _network.pop = function () {
        return this._stack.pop();
    };

    /**
     * Send data to server
     */
    _network.send = function (callback) {
        var _self = this;
        if (this._stack.length > 0) {
            _self._settings.data = JSON.stringify(this._stack);
            $.ajax(_self._settings)
                .done(function(data){
                    _self._received(false, data);
                })
                .fail(function(jxHR, errMessage){
                    _self._received(true, errMessage);
                });
        } else {
            throw { error: 3, message: 'Stack is empty' };
        }
    };

    /**
     * Recv data
     * @param callback
     * @param data
     */
    _network.receive = function (callback) {
        if (typeof (callback) === 'function') {
            this._received = callback;
        } else {
            throw { error: 2, message: 'Call back function invalid' };
        }
    };

    /**
     * Introduce global 
     */
    window.network = _network;

})(window);

