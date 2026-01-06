import axios from 'axios';
import md5 from 'md5';
import { ElMessage } from 'element-plus';
const curl = ({
    url,
    method = 'post',
    headers = {},
    query = {},
    data = {},
    responseType = 'json',
    timeout = 60000,
    errorMessage = '网络异常',
}) => {
    const signKey = 'keerwo1ifnjei29958kfkskdfirejiW';
    const st = Date.now();
    const ajaxSetting = {
        url,
        method,
        params: query,
        data,
        responseType,
        timeout,
        headers: {
            s_sign: md5(`${signKey}_${st}`),
            s_t: st,
            ...headers,
        },
    };

    return axios
        .request(ajaxSetting)
        .then(response => {
            const resData = response.data || {};
            const { success } = resData;
            if (!success) {
                const { code, message } = resData;

                if (code === 442) {
                    ElMessage.error('请求参数异常');
                } else if (code === 445) {
                    ElMessage.error('请求不合法');
                } else if (code === 50000) {
                    ElMessage.error(message);
                } else {
                    ElMessage.error(errorMessage);
                }
                return { success, message, code };
            }

            const { metadata, data } = resData;

            return { data, metadata };
        })
        .catch(error => {
            console.error(errorMessage, error);
            throw error;
        });
};
export default curl;
