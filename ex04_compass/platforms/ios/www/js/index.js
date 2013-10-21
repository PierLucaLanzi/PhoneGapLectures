var isPhoneGapReady = false;
var isPhoneGapConnected = false;
var isNetworkHighSpeed = false;

function device_information(id)
{
    var element = document.getElementById(id);
    element.innerHTML = 
        'Device Model: '    + device.model     + '<br />' +
        'Device Cordova: '  + device.cordova  + '<br />' +
        'Device Platform: ' + device.platform + '<br />' +
        'Device Version: '  + device.version  + '<br />';    
}

function network_information(id)
{
    var element = document.getElementById(id);
    if (isPhoneGapConnected && isNetworkHighSpeed)
    {
        element.innerHTML = 'CONNECTED AT HIGH SPEED';
    } else if (isPhoneGapConnected) {
        element.innerHTML = 'CONNECTED AT SLOW SPEED';
    } else {
        element.innerHTML = 'NOT CONNECTED';
    }
}

function detect_network() { 
    if (isPhoneGapReady) {
        if (navigator.network.connection.type != Connection.NONE) 
        {
            isPhoneGapConnected = true; 
            
            switch (navigator.network.connection.type) 
            {
                case Connection.UNKNOWN: 
                case Connection.CELL_2G: isNetworkHighSpeed = false;
                    break; 
                default:
                    isNetworkHighSpeed = true;
                    break; 
            }
        }
    }    
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        isPhoneGapReady = true;
                
        // check the network
        detect_network();
        
        // print the device properties
        device_information("device_properties");
        network_information("network_properties");
        
    }
};
