onload = function () {
    var pussh = true;
    Hanoe.createField(1600);
    Hanoe.createTower(Hanoe.Count, Hanoe.disk1);
    Hanoe.rekurs(Hanoe.Count, Hanoe.disk1, Hanoe.disk2, Hanoe.disk3);
    document.getElementById("push").addEventListener("click", function(){
        if (pussh) {
            pussh = false;
            Hanoe.Timer();
        }
    });
    document.getElementById("pause").addEventListener("click", function(){
        if (!pussh) {
            pussh = true;
            Hanoe.stopTimer();
        }
    });
    document.getElementById("color").addEventListener("click", function () {
        location.reload();
    });
}

var Hanoe = {
    //empire_var: 0,  80
    stop: 0,
    Count: 9,  ///  TOLKO NE4ETNYE  \\\
    disk1: 1050,
    disk2: 1080,
    disk3: 1109,
    disk11: 0,
    disk22: 0,
    disk33: 0,
    mas: [],
    copyDisk: function(){
        this.disk11 = this.disk1;
        this.disk22 = this.disk2;
        this.disk33 = this.disk3;
    },
    getColor: function () {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    createField: function(n){
        let matrix = document.getElementById('content');
        for (let i = 0; i < n; i++) {
            let div = document.createElement('div');
            div.className = 'cell';
            div.style.backgroundColor = "transparent";
            div.setAttribute("id", i);
            matrix.appendChild(div);
        }
        for(i = 21; i <= 1541; i += 80){
            document.getElementById(i).style.backgroundColor = "white";
            document.getElementById(i + 37).style.backgroundColor = "white";
        }
    },
    createTower: function (n, adr) {      // n - vysota Tower, adr = disk1/2/3
        let t = 3;                        //dlya perehoda na urovenh vyshe;
        for (let i = 1; i < n; i++) {     // podschet dliny diskov;
            t += 2;
        }
        n = t;                             //dlina diskov;
        for (; n >= 3; ) {                 //poh
            color = this.getColor();
            this.createDisk(n, adr, color);
            n -= 2;
            adr -= 80;
        }
        this.disk1 = adr;
        this.copyDisk();
    },
    createDisk: function (n, adr, color) {   //n - dlina disk@(3, 5, 7); adr - vysota / koordinata dlya disk@ ;
        adr = adr - (n - 1) / 2;
            for (i = 0; i < n; i++) {
                document.getElementById(adr + i).style.backgroundColor = color;
            }
    },
    resetDisk: function (n, adr) {          //n - dlina diska, adr - levaya ya4eyka 
        adr = adr - (n - 1) / 2;
            for (let i = 0; i < n; i++) {
                document.getElementById(adr + i).style.backgroundColor = "transparent";
            }
    },
    rekurs: function (n, a, b, c) {
        if (n > 0) {
            this.rekurs(n - 1, a, c, b);
            this.write(a, c);
            this.rekurs(n - 1, b, a, c);
        }
    },
    write: function (a, b) {
        //console.log(arguments);
        let temp = {
            "a": this.reWrite(a, true ),
            "b": this.reWrite(b, false )
        };
        //console.log(temp.a, temp.b);
        this.mas.push(temp);
    },
    reWrite: function (a, flag) {
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
    },
    move: function (n) {                                //n - vysota bashni - nuzhno dlya pods4eta dliny diskov(...)
        let dlina = 0;
        let currentDiskA = Hanoe.mas[0].a;
        let color = document.getElementById(currentDiskA).style.backgroundColor;  // polu4aem color
        let currentTowerB = Hanoe.mas[0].b + 80;                                  // polu4aem koord kuda peredvinetsya disk
        for (let i = -n; i <= n; i++) {
            if (document.getElementById(currentDiskA + i).style.backgroundColor !== "transparent") {
                dlina++;
            } 
        }
        Hanoe.resetDisk(dlina, currentDiskA);
        Hanoe.createDisk(dlina, currentTowerB, color);
        Hanoe.mas.shift();                                                       
    },
    Timer: function () {
        setTimeout(go = function() {
            if (Hanoe.mas.length > 0) {
                Hanoe.move(Hanoe.Count);
                Hanoe.stop = setTimeout(go, 1000);
            } else {
                clearTimeout(Hanoe.stop);
            }
        }, 1000);
    },
    stopTimer: function () {
        clearTimeout(Hanoe.stop);
    }
}