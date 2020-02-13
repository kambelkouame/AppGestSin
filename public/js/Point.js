class Point{
    x
    y
    constructor(x,y){
        this.x = x
        this.y = y
    }
    static distance(a,b){
        return  Math.sqrt(Math.pow((b.x-a.x),2) + Math.pow((b.y - a.y),2))
    }
}

function allDistance(table){
    distance = 0
    for (let i = 0; i < table.length-1; i++) {
        distance = distance+Point.distance(table[i],table[i+1])
    }
    return distance
}

function permutation(table){
    for (let i = 0; i < table.length; i++) {
        if(table[i] instanceof Client) {
            for (let a=i; a < table.length; a++) {
                if(table[a] instanceof Fournisseur){
                    temp = table[i]
                    table[i] = table[a]
                    table[a] = temp
                    break

                }
            }
        }
    }
    return table
}

function geneticChild(parent1,parent2){
    parent1=permutation(parent1)
    parent2=permutation(parent2)
    if(parent1.length==parent2.length){
    stop = Math.ceil(parent.length/2)
    return [
        parent1.slice(0,stop).concat(parent2.slice(stop)),
        parent2.slice(0,stop).concat(parent1.slice(stop))
    ]
    }else{
        console.log("les deux parents doivent avoir la meme taille")
    }
}
