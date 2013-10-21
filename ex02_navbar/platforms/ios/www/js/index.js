/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var isPhoneGapReady = false;
var isPhoneGapConnected = false;
var isNetworkHighSpeed = false;

function device_information(id)
{
    var element = document.getElementById(id);
    element.innerHTML = 
        'Device Name: '     + device.model     + '<br />' +
        'Device Cordova: '  + device.cordova  + '<br />' +
        'Device Platform: ' + device.platform + '<br />' +
        'Device UUID: '     + device.uuid     + '<br />' +
        'Device Model: '    + device.model    + '<br />' +
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
        document.getElementById('device_properties').innerHTML = "binding events...";
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        document.getElementById('device_properties').innerHTML = "DEVICE IS READY";
        
        isPhoneGapReady = true;
        
        // check the network
        detect_network();
        
        // print the device properties
        device_information('device_properties');
        network_information('network_properties');
        
        // wait 5 seconds and then open the home page
        setTimeout(function() { window.open('home.html', '_self', false); }, 5000);
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
