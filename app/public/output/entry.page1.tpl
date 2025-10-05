<!--
 * @Author: lzy 3312202467@qq.com
 * @Date: 2025-09-14 15:17:23
 * @LastEditors: lzy 3312202467@qq.com
 * @LastEditTime: 2025-09-15 23:48:41
 * @FilePath: \elpis\app\public\output\entry.page1.tpl
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!doctype html>
<html lang="en">

<head>
    <title>{{name}}</title>
    <link rel="stylesheet" href="/static/normalize.css">
    <link rel="icon" type="image/x-icon" href="/static/icon.jpg">
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
    axios.get('/api/project/list').then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
</script>

</html>