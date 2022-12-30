export function getValueByKey(object: any, path: string) {
    if (!path.includes(".")) {
        return object[path];
    }

    path = path.replace(/\[(\w+)\]/g, '.$1'); 
    path = path.replace(/^\./, '');          
 
    var a = path.split('.');
 
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (isObject(object) && k in object) {
            object = object[k];
        } else {
            return;
        }
    }
    return object;
}

export function setValueByKey(object: any, path: string, value: any) {

    if (!path.includes(".")) {
        object[path] = value;
        return;
    }

    path = path.replace(/\[(\w+)\]/g, '.$1'); 
    path = path.replace(/^\./, '');          

    var objectRef = object;
    var a = path.split('.');

    for (var i = 0; i < a.length - 1; i++) {
        var elem = a[i];
        if (!objectRef[elem]) objectRef[elem] = {}
        objectRef = objectRef[elem];
    }

    objectRef[a[a.length - 1]] = value;
}


function isObject(o: any) {
    //How you acomplish this is upto you.
    return o === Object(o);
}
