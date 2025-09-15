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