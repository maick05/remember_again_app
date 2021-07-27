import SaveCard from '../pages/saveCard';
import ListCards from '../pages/listCards';
import ListContainers from '../pages/listContainers';
import AnswerCard from '../pages/answerCard';
import Login from '../pages/login';
import Register from '../pages/register';
import Config from '../pages/config';
import ForgetPassword from '../pages/forgetPassword';

export const pages = {
    SaveCard: SaveCard, AnswerCard: AnswerCard, ListCards: ListCards, ListContainers, Login, Register, Config, ForgetPassword,
};

export const navOptions = {
        headerStyle:
            {backgroundColor: 'orange'},
        headerTintColor:'blue'
};
