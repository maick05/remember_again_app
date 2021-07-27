import api from '../services/api';
import {getItem} from '../services/storage';
import { AsyncStorage } from 'react-native';



async function request (url, params, authentication) {

    if(authentication){
        let userSession = await getItem('userSession');
        params.tokenApp = userSession.tokenApp;
        params.iduser = userSession.iduser;
    }

    let response = await api.post(url, params);

    if(response.data.key == 'tokenAppInvalid')
        alert(response.data.mensagem+'. Saia do aplicativo e entre de novo.');
    return response;
};

export default request;
