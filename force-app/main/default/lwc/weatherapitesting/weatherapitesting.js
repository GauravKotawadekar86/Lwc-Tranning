import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import customStyles from '@salesforce/resourceUrl/customStyles';
import { loadStyle } from 'lightning/platformResourceLoader';
import getweatherdetails from '@salesforce/apex/Weatherapitestingcontroller.getweatherapidetails'
export default class Weatherapitesting extends LightningElement {
    showweatherdetails = false;
    cityName = 'London';
    weatherDtails = {};

    connectedCallback() {
        //this.cityName = 'London';
        
        loadStyle(this, customStyles)
            .then(() => {
                console.log('Styles loaded successfully');
                this.handleClick();
            })
            .catch(error => {
                console.error('Error loading styles', error);
            });
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    @wire(CurrentPageReference) pageRef;

    handlechange(event) {
        console.log('event.target.value' + event.target.value);
        this.cityName = event.target.value;
    }

    handlePropertySelected(weatherDetails) {
        console.log('handlePropertySelected(weatherDetails):'+JSON.stringify(weatherDetails));
        fireEvent(this.pageRef, 'gaurav_propertySelected', weatherDetails);//'a0DdL000005KjoTUAS');//);
    }

    handleClick() {
        if (this.isInputValid()) {
            console.log('isInputValid');
            getweatherdetails({ CityName: this.cityName }).then(result => {
                console.log('result' + JSON.stringify(result));
                this.showweatherdetails = true;
                this.weatherDtails = result;
                console.log('result this.weatherDtails' + JSON.stringify(this.weatherDtails));
                this.handlePropertySelected(this.weatherDtails);
            })
            .catch(error => {
                this.showweatherdetails = false;
                console.log('error' + JSON.stringify(error));
            })
        }
        else {
            this.showweatherdetails = false;
            this.weatherDtails = {};
        }

    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(inputField => {
            if (!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
            //this.contact[inputField.name] = inputField.value;
        });
        return isValid;
    }
}