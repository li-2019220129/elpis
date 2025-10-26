<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
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


</script>

</html>