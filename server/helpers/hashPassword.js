import bcrypt from 'bcryptjs';

const bcrypthash = {

    hashpassword: (pass) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        return hash;
    },
    comparepassword: (userpass, dbpass) => {
        try {
            const isTrue = bcrypt.compareSync(userpass, dbpass);
            return isTrue;
        } catch (err) {
            return err;
        }
    },
};

export default bcrypthash;