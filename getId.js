function getId(arr) {
    let ress = [...arr].sort((a, b) => a - b)
    let id = 0;
    for (let i = 0; i < arr.length; i++) {
        let next = i + 1;
        let cur = ress[i];
        id = cur + 1
        if(ress[next]!== id){       
            break
        }
    }
    return id
}

module.exports = getId