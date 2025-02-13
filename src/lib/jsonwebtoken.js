import util from 'util'
import jwtOriginal from 'jsonwebtoken';

const verify = util.promisify(jwtOriginal.verify);
const sign = util.promisify(jwtOriginal.sign);


const jsonwebtoken = {
    verify,
    sign,
    
}
export default jsonwebtoken;