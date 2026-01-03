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
<script defer src="http://127.0.0.1:9002/public/dist/dev/js/vendor_63be8a52.bundle.js"></script><script defer src="http://127.0.0.1:9002/public/dist/dev/js/common_3a40fdb6.bundle.js"></script><script defer src="http://127.0.0.1:9002/public/dist/dev/js/entry.page2_7fb308ed.bundle.js"></script></head>

<body>
    <input id="env" value="{{env}}">
    <input id="options" value="{{options}}">
    <div id="root"></div>
</body>
<script type="text/javascript">
    const env = document.getElementById('env').value;
    const options = document.getElementById('options').value;
    window.options = JSON.parse(options);
</script>

</html>