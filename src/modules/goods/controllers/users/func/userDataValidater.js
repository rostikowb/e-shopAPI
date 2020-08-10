export const userDataValidator = (isFirsReg, nick, email, pass, FN, LN, SN, tel, city, branchN) => {

    const validateEmail = (email) => {
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };

    let errorValidMsg = '';

    if(!isFirsReg)nick = true;

    if (!nick || !email || !pass) return {
        invalid: true,
        message: 'Заполните пожалуйста все поля!'
    };

    if (!validateEmail(email)) errorValidMsg += ' * Невалидный email! ';

    if (pass.length < 8) errorValidMsg += ' * Пароль должен иметь больше 8 символов! ';


    if(!isFirsReg){

        if (!FN || !LN || !SN || !tel || !city || !branchN) return {
            invalid: true,
            message: 'Заполните пожалуйста все поля!'
        };

        if (tel.length < 10) errorValidMsg += ' * Номер телефона должен иметь минимум 10 символов! ';

        if(FN.length <2 || LN.length <2 || SN.length <2) errorValidMsg += ' * Заполните поля ФИО! ';

        if(city.length <4 || branchN.length <4) errorValidMsg += ' * Заполните поля доставки, начните вводить, остальное система подскажет! ';
    }

    if (errorValidMsg.length > 1) return {invalid: true, message: errorValidMsg};

    // false is valid
    return false;
};