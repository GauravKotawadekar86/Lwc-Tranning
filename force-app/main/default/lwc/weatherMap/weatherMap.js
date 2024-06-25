import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';

import { registerListener, unregisterAllListeners } from 'c/pubsub';


export default class PropertyMap extends LightningElement {
    @api recordId;

    @track address;

    @track zoomLevel = 14;

    @track markers = [];

    @track error;

    weatherDetailsformap = {};

    @wire(CurrentPageReference) pageRef;

    //@wire(getRecord, { recordId: '$recordId', fields })
    plotmap(weatherDetailsformap) {
        if (weatherDetailsformap) {
            console.log('plotmap ::: weatherDetailsformap::'+JSON.stringify(weatherDetailsformap.latitude));
            this.error = undefined;
            this.address = weatherDetailsformap.country+','+weatherDetailsformap.cityname;
            this.markers = [
                {
                    location: {
                        Latitude: weatherDetailsformap.latitude,
                        Longitude: weatherDetailsformap.longitude
                    },
                    title: weatherDetailsformap.country+','+weatherDetailsformap.cityname+ ':' +weatherDetailsformap.longitude+','+weatherDetailsformap.longitude
                }
            ];
        } else if (!weatherDetailsformap) {
            this.error = 'Somthing went wrong';
            this.address = undefined;
            this.markers = [];
        }
    }

    connectedCallback() {
        console.log('Weather Map event registered ');
        registerListener(
            'gaurav_propertySelected',
            this.handlePropertySelected,
            this
        );
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handlePropertySelected(weatherDetails) {
        console.log('handlePropertySelected ::: weatherDetails::'+JSON.stringify(weatherDetails));
        this.weatherDetailsformap = weatherDetails;
        this.plotmap(this.weatherDetailsformap);
    }
}