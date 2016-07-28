onload = function () {
    var pussh = true;
    var towers = new Hanoe(1600);
    towers.init();
    document.getElementById("push").addEventListener("click", function () {
        if (pussh) {
            pussh = false;
            towers.Timer();
        }
    });
    document.getElementById("pause").addEventListener("click", function () {
        if (!pussh) {
            pussh = true;
            towers.stopTimer();
        }
    });
    document.getElementById("color").addEventListener("click", function () {
        location.reload();
    });
}

class Hanoe {
    constructor(n) {
        this.n = n;
    }
    init() {
        this.Count = 11;
        this.mas = [];
        this.createField();
        this.createDisks(1052, 1080, 1106);
        this.createTower(this.Count, this.disk1);
        this.copyDisks();
        this.rekurs(this.Count, this.disk1, this.disk2, this.disk3);
    }
    copyDisks() {
        this.disk11 = this.disk1;
        this.disk22 = this.disk2;
        this.disk33 = this.disk3;
    }
    createField() {
        let matrix = document.getElementById('content');
        for (let i = 0; i < this.n; i++) {
            let div = document.createElement('div');
            div.className = 'cell';
            div.style.backgroundColor = "transparent";
            div.setAttribute("id", i);
            matrix.appendChild(div);
        }
        for(let i = 1120; i < 1200; i++){
            document.getElementById(i).style.backgroundColor = "white";
        }
        for(let i = 1146; i <= 1546; i +=80){
            document.getElementById(i).style.backgroundColor = "white";
            document.getElementById(i + 27).style.backgroundColor = "white";
        }
    }
    getRandColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    createDisks(disk1, disk2, disk3) {
        this.disk1 = disk1;
        this.disk2 = disk2;
        this.disk3 = disk3;
        
    }
    createTower(n, adr) {
        let t = 3;                        //dlya perehoda na urovenh vyshe;
        for (let i = 1; i < n; i++) {     // podschet dliny diskov;
            t += 2;
        }
        n = t;                             //dlina diskov;
        for (let i = 0; n >= 3; i++) {
            let color = this.getRandColor();
            this.createDisk(n, adr, color);
            n -= 2;
            adr -= 80;
        }
        this.disk1 = adr;
        
    }
    createDisk(n, adr, color) {
        adr = adr - (n - 1) / 2;
        for (let i = 0; i < n; i++) {
            document.getElementById(adr + i).style.backgroundColor = color;
        }
    }
    resetDisk(n, adr) {
        adr = adr - (n - 1) / 2;
        for (let i = 0; i < n; i++) {
            document.getElementById(adr + i).style.backgroundColor = "transparent";
        }
    }
    rekurs(n, a, b, c) {
        if (n > 0) {
            this.rekurs(n - 1, a, c, b);
            this.write(a, c);
            this.rekurs(n - 1, b, a, c);
        }
    }
    move(n) {
        let dlina = 0;
        let currentDiskA = this.mas[0].a;
        let color = document.getElementById(currentDiskA).style.backgroundColor; // polu4aem color
        let currentTowerB = this.mas[0].b + 80;                                  // polu4aem koord kuda peredvinetsya disk
        for (let i = -n; i <= n; i++) {
            if (document.getElementById(currentDiskA + i).style.backgroundColor !== "transparent") {
                dlina++;
            }
        }
        this.resetDisk(dlina, currentDiskA);
        this.createDisk(dlina, currentTowerB, color);
        this.mas.shift();
    }
    Timer() {
        let that = this;
        setTimeout(function go() {
            if (that.mas.length > 0) {
                that.move(that.Count);
                that.stop = setTimeout(go, 1000);
            } else {
                clearTimeout(Hanoe.stop);
            }
        }, 1000);
    }
    stopTimer() {
        let that = this;
        clearTimeout(that.stop);
    }
    write(a, b) {
        let temp = {
            "a": this.reWrite(a, true),
            "b": this.reWrite(b, false)
        };
        this.mas.push(temp);
    }
    reWrite(a, flag) {
        if (a === this.disk1) {
            if (flag) {
                return this.disk11 += 80;
            } else {
                return this.disk11 -= 80;
            }
        } else if (a === this.disk2) {
            if (flag) {
                return this.disk22 += 80;
            } else {
                return this.disk22 -= 80;
            }
        } else if (a === this.disk3) {
            if (flag) {
                return this.disk33 += 80;
            } else {
                return this.disk33 -= 80;
            }
        }
    }
    doWork() {
        setTimeout(function () {
            console.log(this.n)
        }, 100);
    }
    doWork2() {
        setTimeout(() => {
            console.log(this.n);
        }, 100);
    }
    sayMyau(s) {
        console.log("Myau");
        if (s > 0) {
            this.sayMyau(s - 1);
        }
        console.log("Myau Myau");
    }
}