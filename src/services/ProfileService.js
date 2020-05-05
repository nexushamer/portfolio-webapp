import axios from 'axios';
import { properties } from '../config/properties';

const ProfileService = {
    SERVICE_PATH_TEMPLATE: '/users',
    retrieveProfile: async function (userId) {
        const serviceEndpoint = properties.wsEndpoint + ProfileService.SERVICE_PATH_TEMPLATE + '/' + userId + '/profile';
        let response = null;

        try {
            response = await axios.get(serviceEndpoint);
        } catch (e) {
            alert('There was an issue with the server connection, check if the service is avalible');
            console.log(e);
        }

        return response;
    },
    updateProfile: async function(profile){
        const serviceEndpoint = properties.wsEndpoint + ProfileService.SERVICE_PATH_TEMPLATE + '/' + profile.userId + '/profile';

        let response = null;

        try {
            response = await axios.put(serviceEndpoint, profile);
        } catch (e) {
            alert('There was an issue with the server connection, check if the service is avalible');
            console.log(e);
        }

        return response;
    },
    updateProfilePicture: async function(profile){
        const serviceEndpoint = properties.wsEndpoint + ProfileService.SERVICE_PATH_TEMPLATE + '/' + profile.userId + '/profile/picture';
        const formData = new FormData();
        formData.append('profilePicture', profile.file, 'profilePicture');
        const headers = { headers: { 'Content-Type': 'multipart/form-data' }};

        let response = null;

        try {
            response = await axios.patch(serviceEndpoint, formData, headers);
        } catch (e) {
            alert('There was an issue with the server connection, check if the service is avalible');
            console.log(e);
        }

        return response;
    }
};

export default ProfileService;