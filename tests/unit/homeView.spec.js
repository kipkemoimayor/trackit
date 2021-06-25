import { mount } from '@vue/test-utils';

import HomeView from '../../src/components/HomeView.vue';


const testData = {
    regNo: "KAY 747E",
    driver: "Driver A",
    size: 27,
    cargoType: "FlatBed",
    goodsType: "Rice",
    location: "Kenya",
    lastUpdated: 0,
};
// HomeView.use(VueGoogleMaps);
describe('HomeView', () => {
    it('Home view component name type should be', () => {
        expect(typeof HomeView.name).toBe("string");
    });

    it('Home View name should be', () => {

        expect(HomeView.name).toEqual('HomeView');
    });
});

describe('Mounted App', () => {
    const wrapper = mount(HomeView);
    it('is valid instance', () => {
        expect(wrapper.exists()).toBeTruthy();
    });


    it('is default data set', () => {
        expect(HomeView.data().truckInfo).toEqual(testData);
    });

    it('type of data should be object', () => {
        expect(typeof HomeView.data().truckInfo).toBe('object');
    });
});


describe('App button clicked', () => {
    it('before order selected is false trigger count', () => {
        expect(HomeView.data().isSelected).toBe(false);
    });

});






