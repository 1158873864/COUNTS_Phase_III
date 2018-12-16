function getUsername(){
    var username;
    var arr=document.cookie.split('; '); //多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    for(var i=0;i<arr.length;i++) { //历遍数组
        var key = arr[i].split("=");
        //找到名称为position和username的cookie，并返回它的值
        if ("username" == key[0]) {
            username = key[1];
        }
    }
    return username;
}
function getPosition(){
    var position;
    var arr=document.cookie.split('; '); //多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    for(var i=0;i<arr.length;i++) { //历遍数组
        var key = arr[i].split("=");
        //找到名称为position和username的cookie，并返回它的值
        if ("position" == key[0]) {
            position = key[1];
        }

    }
    return position;
}