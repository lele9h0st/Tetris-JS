class Block {
    constructor(block_matrix, color, settle,id) {
        this.block_matrix = block_matrix;
        this.color = color
        this.settle = settle;
        this.id=id;
    }

    left_most_block(blocks) {
        let min = blocks[0][1];
        let min_index = 0;
        for (let i = 1; i < blocks.length; i++) {
            if (blocks[i][1] < min) {
                min_index = i;
                min = blocks[i][1];
            }
        }
        return min;
    }

    right_most_block(blocks) {
        let max = blocks[0][1];
        let max_index = 0;
        for (let i = 1; i < blocks.length; i++) {
            if (blocks[i][1] > max) {
                max_index = i;
                max = blocks[i][1];
            }
        }
        return max;
    }

    moveLeft() {
        let left_most_index = this.left_most_block([...this.block_matrix])
        if (left_most_index - 1 >= 0) {
            for (let i = 0; i < this.block_matrix.length; i++) {
                var loc = [...this.block_matrix[i]];
                var oldLoc = [...this.block_matrix[i]];

                // console.log("left"+loc)
                // console.log("left"+oldLoc[0])
                // console.log("left"+oldLoc[1])

                loc[1] -= 1;
                this.block_matrix[i] = loc;
                let block1 = this.block_matrix[i][0] + "-" + this.block_matrix[i][1]
                let oldblock = oldLoc[0] + "-" + (loc[1] + 1);
                $("#" + block1 + "").css("background", "red");
                $("#" + oldblock + "").css("background", "yellow");
                // let r = Math.floor(Math.random() * 10);
                // $("#" + oldblock + "").text(r + "");
            }

        }
    }

    moveRight() {
        let right_most_index = this.right_most_block([...this.block_matrix])
        if (right_most_index + 1 <= 9) {
            for (let i = this.block_matrix.length - 1; i >= 0; i--) {
                var loc = [...this.block_matrix[i]];
                var oldLoc = [...this.block_matrix[i]];

                // console.log("right"+loc)
                // console.log("right"+oldLoc[0])
                // console.log("right"+oldLoc[1])


                loc[1] += 1;
                this.block_matrix[i] = loc;
                let block1 = this.block_matrix[i][0] + "-" + this.block_matrix[i][1]
                let oldblock = oldLoc[0] + "-" + (loc[1] - 1);
                $("#" + block1 + "").css("background", "red");
                $("#" + oldblock + "").css("background", "yellow");
                // let r = Math.floor(Math.random() * 10);
                // $("#" + oldblock + "").text(r + "");


            }
        }

    }

    isSettle() {
        for (let i = 0; i < this.block_matrix.length; i++) {
            let loc = this.block_matrix[i];
            let nextloc = loc[0] + 1;
            let next = nextloc + "-" + this.block_matrix[i][1]
            let nextText = $("#" + next).text();
            if (nextloc > 20 || nextText != "i") {

                this.settle = true;
                break;
            }
        }
        return this.settle;
    }

    drop() {
        for (let i = 0; i < this.block_matrix.length; i++) {
            var loc = [...this.block_matrix[i]];
            var oldLoc = [...this.block_matrix[i]];

            // console.log(loc)
            // console.log(oldLoc[0])
            // console.log(oldLoc[1])
            loc[0] += 1;
            this.block_matrix[i] = loc;
            let block1 = this.block_matrix[i][0] + "-" + this.block_matrix[i][1]
            let oldblock = (loc[0] - 1) + "-" + oldLoc[1];
            $("#" + block1 + "").css("background", "red");
            $("#" + oldblock + "").css("background", "none");
            // let r = Math.floor(Math.random() * 10);
            // $("#" + oldblock + "").text("i");
            //  $("#" + block1 + "").text(1);
        }
    }
}

$(document).ready(function () {
    let l=[[2,4],[1,4],[0,4],[2,5]]
    let rl=[[2,5],[1,5],[0,5],[2,4]]
    let long=[[4,5],[3,5],[2,5],[1,5],[0,5]]
    let square=[[1,4],[1,5],[0,4],[0,5]]
    let t=[[1,4],[1,5],[1,6],[0,5]]
    let type=[l,rl,long,square,t];
    let idname = "";
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            idname = i + "-" + j
            $("#playground").append('<div class="small-block" id="' + idname + '">i</div>')
        }
    }

    var arr = type[Math.floor(Math.random() * 5)];
    // arr[0] = [0, 5]
    // arr[1] = [0, 6]
    let id=0;
    var b = new Block(arr, "red", false,id);
    var c = 1
    var blocks_arr = [b]

    var i = 1;                  //  set your counter to 1

    function myLoop(b) {
        b=blocks_arr[blocks_arr.length-1];
        setTimeout(function () {
            let state = 0//0:drop 1:left 2:ridht
            // console.log("+++++++++")
            // console.log(b)
            // console.log(b.block_matrix[1])
            if (!b.isSettle()) {

                $(document).keydown(function (e) {
                    b=blocks_arr[0];
                    console.log(b.id)
                    switch (e.which) {
                        case 37: // left
                            b.moveLeft()
                            $(document).preventDefault()
                            break;

                        case 38: // up
                            break;

                        case 39: // right
                            b.moveRight()
                            $(document).preventDefault()
                            break;

                        case 40: // down
                            b.drop();
                            $(document).preventDefault()
                            break;
                    }

                });
                b.drop()
            } else {
                let cb = JSON.parse(JSON.stringify(b));
                for(let i=0;i<cb.block_matrix.length;i++){
                    let block1 = cb.block_matrix[i][0] + "-" + cb.block_matrix[i][1];
                    $("#" + block1 + "").text(1);
                }
                delete b;
                arr = type[Math.floor(Math.random() * 5)];
                // arr[1] = [0, 5]
                // arr[0] = [1, 5]
                // console.log("create new b")
                b = new Block(arr, "red", false,++id);
                // console.log(b)
                // console.log(b.block_matrix[1])
                blocks_arr[0]=b;
                console.log(blocks_arr.length+"***********************")
            }

            // console.log(b.isSettle())
            // console.log(c)
            c++;
            if (c < 1000) {
                myLoop(b);
            }
        }, 200)
    }

        myLoop(b);

});