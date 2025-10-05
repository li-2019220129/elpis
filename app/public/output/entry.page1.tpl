<!--
 * @Author: lzy 3312202467@qq.com
 * @Date: 2025-09-14 15:17:23
 * @LastEditors: lzy 3312202467@qq.com
 * @LastEditTime: 2025-10-05 16:05:01
 * @FilePath: \elpis\app\public\output\entry.page1.tpl
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!doctype html>
<html lang="en">

<head>
    <title>{{name}}</title>
    <link rel="stylesheet" href="/static/normalize.css">
    <link rel="icon" type="image/x-icon" href="/static/icon.jpg">
    <script src="
    https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
    "></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>
    <h1>Page1</h1>
    <input id="env" value="{{env}}">
    <input id="options" value="{{options}}">
</body>
<script type="text/javascript">
    const env = document.getElementById('env').value;
    const options = document.getElementById('options').value;
    window.options = JSON.parse(options);

    const signKey = 'keerwo1ifnjei29958kfkskdfirejiW';
    const st = Date.now();
    axios.request({
        url: '/api/project/list',
        method: 'get',
        params: {
            proj_key: '1234567890'
        },
        headers: {
            's_t': st,
            's_sign': MD5(`${signKey}_${st}`)
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
</script>

</html>